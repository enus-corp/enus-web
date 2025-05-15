import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    // Handle protected routes
    if (request.nextUrl.pathname.startsWith("/chat")) {
        if (!refreshToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Handle auth routes (redirect if already logged in)
    if (["/login", "/signup", "/onboarding", "/oauth-callback"].includes(request.nextUrl.pathname)) {
        if (refreshToken) {
            return NextResponse.redirect(new URL("/chat", request.url));
        }
    }

    // For API routes that need authentication, add the Bearer token
    if (request.nextUrl.pathname.startsWith("/api/") && 
        !request.nextUrl.pathname.startsWith("/api/auth/") &&
        accessToken) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("Authorization", `Bearer ${accessToken.value}`);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/chat/:path*", 
        "/login", 
        "/signup", 
        "/onboarding", 
        "/oauth-callback",
        "/api/:path*"
    ],
}
