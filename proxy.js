import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'

export function proxy(request) {

    try {

        const token = request.headers.get("authorization")?.split("Bearer ")[1];

        if (!token) return NextResponse.redirect(new URL("/login",request.url));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) return NextResponse.redirect(new URL("/login",request.url));

        const requestHeader = new Headers(request.headers);

        requestHeader.set("x-user", JSON.stringify(decoded));

        return NextResponse.next({
            request: {
                headers: requestHeader
            }
        })
    } catch (error) {
        console.log("Error in proxy: ", error.message);
        // return NextResponse.json({
        //     success:false,
        //     message:error.message
        // })
        return NextResponse.redirect(new URL("/login",request.url));
    }
}

export const config = {
    matcher: [
        '/api/users/logout',
        '/api/users/update',
        '/api/users/getusers'
    ]
}