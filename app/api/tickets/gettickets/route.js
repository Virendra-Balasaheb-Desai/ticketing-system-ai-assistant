import { connectDB } from "@/db";
import Ticket from "@/models/ticket";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {

        const user = JSON.parse(await req.headers.get("x-user"));
        let tickets = [];

        await connectDB();
        if(user.role !== "user"){
            tickets = await Ticket.find({})
            .populate("assignedTo",["email","_id"])
            .sort({createdAt:-1});
        }
        else{
            tickets = await Ticket.find({createdBy:user._id})
            .select("title description status createdAt")
            .sort({createdAt:-1});
        }

        return NextResponse.json({
            success: true,
            message: "Tickets fetched Successfully",
            data:tickets
        });

    } catch (error) {
        console.log("Error in Tickets fetching : ", error?.message);
        return NextResponse.json({
            success: false,
            message: error?.message
        });
    }

}

