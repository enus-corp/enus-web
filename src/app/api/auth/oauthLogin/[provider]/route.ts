import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { provider: string } }
) {
    const provider = params.provider.toLowerCase();

    const validProviders = ['google', 'kakao', 'naver'];
    if (!validProviders.includes(provider)) {
        console.warn(`Invalid OAuth provider attempt: ${provider}`);
        // Redirect to the error page with the error type
        return NextResponse.redirect(new URL('/oauth-error?type=invalid_provider', request.url));
    }

    const backendURL = process.env.BACKEND_URL || 'http://localhost:8080';
    const oauthURL = `${backendURL}/api/oauth/${provider}`;

    return NextResponse.redirect(oauthURL);
}