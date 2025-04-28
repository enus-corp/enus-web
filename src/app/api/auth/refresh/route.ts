import { refreshToken as refresh } from "@/services/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const refreshToken = (await cookies()).get("refreshToken");
        if (!refreshToken) {
            return NextResponse.json(
                {error: "No refresh token found"},
                {status: 401}
            )
        }

        const response = await refresh({refreshToken:refreshToken.value});
        const {accessToken} = response;
        return NextResponse.json({accessToken});

    } catch (error) {
        console.error("Error during refresh", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}