import { exchangeToken } from "@/services/auth";
import { OAuthCallbackResponse } from "@/types/response/oauthCallbackResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("--------------------------------");
        console.log("Exchange token request received");
        console.log("--------------------------------");
        const body = await request.json();

        const serverResponse : OAuthCallbackResponse = await exchangeToken(body);
        const { token, user } = serverResponse;

        console.log("Token received:", token);

        // Create the response with user data only
        const response = NextResponse.json({
            data: { user }
        });

        // Set both tokens as HTTP-only cookies
        response.cookies.set("accessToken", token.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 // 1 hour
        });

        response.cookies.set("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;
        
    } catch (error) {
        console.error("Error during signin", error);
        return NextResponse.json({
            error: true,
            message: error instanceof Error ? error.message : "Internal server error"
        }, {status: 500});
    }
}