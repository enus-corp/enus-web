import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get("refreshToken");

    if (request.nextUrl.pathname.startsWith("/chat")) {
        if (!refreshToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (["/login", "/signup","onboarding","/oauth-callback"].includes(request.nextUrl.pathname)) {
        if (refreshToken) {
            return NextResponse.redirect(new URL("/chat", request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/chat/:path*", "/login", "/signup", "/onboarding", "/oauth-callback"],
}
