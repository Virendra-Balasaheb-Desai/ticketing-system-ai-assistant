import { connectDB } from "@/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
    
        const { email, password} = await req.json();
        
        if (!email || !password) throw Error("Empty email or password.");

        await connectDB();
        const userExists = await User.findOne({ email });
        if(!userExists) throw Error("User with email doesn't exists in system.");

        const isMatched = bcrypt.compare(password,userExists.password);

        if (!isMatched) throw Error("Invalid password.");

        const user = await User.findById(userExists._id).select("-password");

        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        return NextResponse.json({
            success: true,
            message: "Login Successfully",
            token,
            data:user
        });

    } catch (error) {
        console.log("Error in User Login: ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }

}

