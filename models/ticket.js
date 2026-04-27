import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
    {
        title: {
            type:"String"
        },
        description: {
            type:"String"
        },
        status:{
            type:"String",
            default: "OPEN",
            enum: ["OPEN","ASSIGNED","CLOSE"]
        },
        relatedSkills:[
            String
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,   
            ref: "User"
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        priority: {
            type:"String"
        },
        deadline: {
            type:"Date"
        },
        helpfulNotes: {
            type:"String"
        },
    },
    {
        timestamps: true
    }
)
export default mongoose.models.Ticket || mongoose.model("Ticket",ticketSchema);