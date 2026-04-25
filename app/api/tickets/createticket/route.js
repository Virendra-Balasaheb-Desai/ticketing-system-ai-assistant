import { connectDB } from "@/db";
import { inngest } from "@/inngest/client";
import Ticket from "@/models/ticket";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
    
        const { title, description } = await req.json();
        const user = JSON.parse(await req.headers.get("x-user"));
        
        if (!title || !description) throw Error("Empty title or description.");

        await connectDB();
     
        const ticket = await Ticket.create({
            title,
            description,
            createdBy: user?._id.toString()
        });

        if(!ticket) throw Error("Unable to create new ticket in system.");

        await inngest.send({
            name:"ticket/created",
            data: {
                ticketId: (await ticket)._id.toString()
            }
        });

        return NextResponse.json({
            success: true,
            message: "Ticket created Successfully",
            data:ticket
        });

    } catch (error) {
        console.log("Error in Ticket creation: ", error?.message);
        return NextResponse.json({
            success: false,
            message: error?.message
        });
    }

}

