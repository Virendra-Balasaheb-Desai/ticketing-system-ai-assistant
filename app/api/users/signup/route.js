import { connectDB } from "@/db";
import { inngest } from "@/inngest/client";
import User from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
    
        const { email, password, skills = [] } = await req.json();
        
        if (!email || !password) throw Error("Empty email or password.");
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectDB();
        const userExists = await User.findOne({ email });
        if(userExists) throw Error("User with same email already exists in system.");

        const userCreated = await User.create({ email, password:hashedPassword, skills });

        if (!userCreated) throw Error("Empty email or password");

        //Fire inngest event
        await inngest.send({
            name: "user/signup",
            data: {
                email
            }
        });      
        
        const user = await User.findById(userCreated._id).select("-password");

        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        return NextResponse.json({
            success: true,
            message: "Singup Successfully",
            token,
            data:user
        });

    } catch (error) {
        console.log("Error in User Signup: ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }

}

