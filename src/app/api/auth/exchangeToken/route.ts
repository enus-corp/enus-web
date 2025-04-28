import { exchangeToken } from "@/services/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {tempToken} = body;

        const serverResponse = await exchangeToken(tempToken);
        const token = serverResponse.token;

        (await cookies()).set("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1day
        })

        return NextResponse.json({accessToken: token.accessToken});
        
    } catch (error) {
        console.error("Error during signin", error);
        return NextResponse.json({error: error instanceof Error ? error.message : "Internal server error"}, {status: 500});
    }
}