import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
    {
        name: {
            type:"String"
        },
        descriptions: {
            type:"String"
        },
        status:{
            type:"Enum",
            default: "OPEN",
            enum: ["OPEN","ASSIGNED","CLOSE"]
        },
        requiredSkills:[
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