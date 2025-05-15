import { NextResponse } from "next/server";
import { self } from "@/services/user";

export async function GET() {
    try {
        console.log("--------------------------------");
        console.log("User self request received");
        console.log("--------------------------------");

        // Call the backend API through self method
        const user = await self();
        console.log("User data received:", user);

        // Return the user data
        return NextResponse.json({
            data: user
        });

    } catch (error) {
        console.error("Error in user self route:", error);
        return NextResponse.json({
            error: true,
            message: error instanceof Error ? error.message : "Internal server error"
        }, { status: 500 });
    }
}
