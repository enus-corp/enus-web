import { NextRequest, NextResponse } from "next/server";
import { UpdateUserRequest } from "@/types/request/updateUserRequest";
import { update } from "@/services/user";
import { User } from "@/types/user";

export async function PUT(request: NextRequest) {
    try {
        console.log("--------------------------------");
        console.log("User update request received");
        console.log("--------------------------------");

        const body = await request.json() as UpdateUserRequest;
        
        // Call the backend API through protectedApi
        const user : User = await update(body);
        console.log("Updated request body:", user);

        // Return the updated user data
        return NextResponse.json({data: user});

    } catch (error) {
        console.error("Error in user update route:", error);
        return NextResponse.json({
            error: true,
            message: error instanceof Error ? error.message : "Internal server error"
        }, { status: 500 });
    }
}