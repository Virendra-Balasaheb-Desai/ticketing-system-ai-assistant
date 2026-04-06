import { NonRetriableError } from "inngest";
import { inngest } from "../client";
import User from "@/models/user";
import { sendMail } from "@/utils/mailer";

export const onSignupUser = inngest.createFunction(
    {id:"on-user-signup", retries:2, triggers:{event:"user/signup"} },   
    async ({event, step}) => {
        try {
            const {email} = event.data;

            //step 1: check user exists or not
            const user = await step.run("get-user-email", async () => {
                const userObject = await User.findOne({email});
                if(!userObject){
                    throw new NonRetriableError("User doesn't exists")
                }
                return userObject;
            })

            //step 2: send mail to user
            await step.run("send-welcome-email", async () => {
                const subject = "<h2>Welcome to the Ticketing System</h2>"
                const message = "<h4>Thanks for signing up. Explore our Ticketing System.</h4>"
                await sendMail(user.email,subject,message);                
            })

            return {success:true}

        } catch (error) {
            console.log("Error in running step:",error.message);
            return {success:false}
        }
    }
)