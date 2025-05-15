import { NextResponse } from "next/server";

export async function POST() {
    try {
        console.log("--------------------------------");
        console.log("Logout request received");
        console.log("--------------------------------");

        // Create response
        const response = NextResponse.json({
            data: { message: "Logged out successfully" }
        });

        // Clear both access and refresh token cookies
        response.cookies.set("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0
        });

        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0
        });

        return response;

    } catch (error) {
        console.error("Error in logout route:", error);
        return NextResponse.json({
            error: true,
            message: error instanceof Error ? error.message : "Internal server error"
        }, { status: 500 });
    }
} 