import { connectDB } from "@/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const user = JSON.parse(req.headers.get("x-user") || "null");

        console.log(user);
        

        if(!user || user.role !== "admin") throw Error("Forbidden Request");
          
        const { email, role, skills = [] } = await req.json();
        
        if (!email) throw Error("Empty email.");
        
        await connectDB();
        const userExists = await User.findOne({ email });

        if(!userExists) throw Error("User doesn't exists in system.");

        const updatedUser = await User.findByIdAndUpdate(userExists._id,{ skills: skills.length == 0 ? skills: user.skills, role}).select("-password");

        if (!updatedUser) throw Error("Unable to update user");

        return NextResponse.json({
            success: true,
            message: "User updated Successfully",
            data : updatedUser
        });

    } catch (error) {
        console.log("Error in User update: ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }

}