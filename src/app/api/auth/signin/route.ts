import { loginUser } from "@/services/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await loginUser(body);
        const {accessToken, refreshToken} = response;

        // store refresh token in HTTP-only cookie
        (await cookies()).set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1day
        })

        // only return access token (do not return refresh token)
        return NextResponse.json({accessToken});

    } catch (error) {
        console.error("Error during signin", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}