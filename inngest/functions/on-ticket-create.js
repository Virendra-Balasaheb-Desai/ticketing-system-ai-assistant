import Ticket from "@/models/ticket";
import { inngest } from "../client";
import { NonRetriableError } from "inngest";
import analyzeTicket from "@/utils/ai";
import User from "@/models/user";
import { sendMail } from "@/utils/mailer";


export const onTicketCreate = inngest.createFunction(
    { id:"on-ticket-created", retries:2 ,triggers:{event:"ticket/created"} },
    async ({event, step}) => {
        try {
            const { ticketId } = event.data;
    
            //fetch ticket
            const ticket = await step.run("find-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketId);
                if(!ticketObject) throw NonRetriableError("Ticket not found");
    
                return ticketObject;
            })

            const aiResponse = await analyzeTicket(ticket);

            //process ticket
            const relatedSkills = await step.run("ai-processing", async () => {
                let skills = []
                if(aiResponse){
                    const priorities = ['low','medium','high'];
                    await Ticket.findByIdAndUpdate(ticket._id,{
                        priority: !priorities.includes(aiResponse.priority)?"medium":aiResponse.priority,
                        helpfulNotes:aiResponse.helpfulNotes,
                        status:"ASSIGNED",
                        relatedSkills: aiResponse.relatedSkills
                    })            
                    skills = aiResponse.relatedSkills;
                }
                return skills;
            })

            //assign moderator
            const moderator = await step.run("assign-moderator",async () => {
                let user = await User.findOne({
                    role: "moderator",
                    skills: {
                        $elemMatch:{
                            $regex: relatedSkills.join("|"),
                            $options: "i"
                        }
                    }
                });

                if(!user){
                    user = await User.findOne({
                        role: "admin",
                    })
                }

                await Ticket.findByIdAndUpdate(ticket._id,{
                    assignedTo: user._id || null
                })
                return user;
            })

            //send mail to moderator
            await step.run("send-mail-notification", async () => {
                if(moderator){
                    const ticketOwner = await User.findById(ticket.createdBy);
                    await sendMail(
                        moderator.email,
                        "New Ticket assigned",
                        `
                        <h3>A new ticket assigned to you</h3>
                        <div>Title : ${ticket.title}</div>
                        <div>Created By : ${ticketOwner.email}</div>
                        `
                    );
                }
            })

            return {success:true};

        } catch (error) {
            console.log("Error in ticket assignment : ",error?.message);
            return {success:false};
        }
    }
)