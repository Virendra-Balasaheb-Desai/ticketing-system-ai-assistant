import { connectDB } from "@/db";
import Ticket from "@/models/ticket";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {

    try {

        const user = JSON.parse(await req.headers.get("x-user"));
        let ticket;
        const userId = (await params).id;
        
        await connectDB();
        if(user.role !== "user"){
            ticket = await Ticket.find({createdBy:userId})
            .populate("assignedTo",["email","_id"])
        }
        else{
            ticket = await Ticket.findOne({ _id:userId, createdBy:user._id })
            .select("title description status createdAt");
        }

        if(!ticket) throw new Error("Unable to fetch ticket.")

        return NextResponse.json({
            success: true,
            message: "Ticket fetched Successfully",
            data:ticket
        });

    } catch (error) {
        console.log("Error in Ticket fetching : ", error?.message);
        return NextResponse.json({
            success: false,
            message: error?.message
        });
    }

}

