import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { provider: string } }
) {
    const provider = params.provider.toLowerCase();

    const validProviders = ['google', 'kakao', 'naver'];
    if (!validProviders.includes(provider)) {
        return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    const backendURL = process.env.BACKEND_URL || 'http://localhost:8080';
    const oauthURL = `${backendURL}/api/oauth/${provider}`;

    return NextResponse.redirect(oauthURL);
}