import { connectDB } from "@/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const user = JSON.parse(req.headers.get("x-user") || "null");

        if(!user || user.role !== "admin") throw Error("Forbidden Request");
          
        
        await connectDB();
        const users = await User.find().select("-password");

        if(!users) throw Error("Users doesn't exists in system.");

        return NextResponse.json({
            success: true,
            message: "Users fetched Successfully",
            data : users
        });

    } catch (error) {
        console.log("Error in get Users: ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }

}