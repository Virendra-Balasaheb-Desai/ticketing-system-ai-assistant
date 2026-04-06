import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export async function POST(req) {

    try {
        
        const token = await req.headers.get("authorization")?.split("Bearer ")[1];
        if (!token) throw Error("Unauthorized request.");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) throw Error("Unauthorized request.");

        return NextResponse.json({
            success: true,
            message:"Logout Successfully",
            token: ""
        });

    } catch (error) {
        console.log("Error in User Login: ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }

}

