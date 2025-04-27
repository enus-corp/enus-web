import { loginUser } from "@/services/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const credentials = await request.json();
        const response = await loginUser(credentials);
        const {accessToken, refreshToken} = response;

        // store refresh token in HTTP-only cookie
        (await
            // store refresh token in HTTP-only cookie
            cookies()).set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
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