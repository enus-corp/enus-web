'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import styled from 'styled-components';
import { UserDTO } from '@/types/user';
import { exchangeToken as exchange } from '@/services/auth';
// Basic styled component for feedback
const CallbackContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    text-align: center;
    padding: 20px;
`;

const Message = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

export default function OAuthCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUser } = useUser();

    const [message, setMessage] = useState('Processing authentication...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const tempToken = searchParams.get('tempToken');

        if (!tempToken) {
            setError('Temporary token not found. Redirecting to login...');
            setTimeout(() => router.push('/login'), 3000);
            return;
        }

        const needsAdditionalInfo = (user: UserDTO) : boolean => {
            return (
                !user.firstName || 
                !user.lastName || 
                !user.username || 
                !user.email || 
                !user.gender || 
                !user.age
            );
        }

        const exchangeToken = async () => {
            try {
                const response = await exchange({tempToken: tempToken});
                const { token, user } = response;
                localStorage.setItem('accessToken', token.accessToken);
                localStorage.setItem('refreshToken', token.refreshToken);

                const infoRequired = needsAdditionalInfo(user);
                if (infoRequired) {
                    setUser(user);
                    router.push("/onboarding");
                } else {
                    setMessage("Authentication successful! Redirecting...");
                    setTimeout(() => router.push('/chat'), 2000);
                }
            } catch (err) {
                console.error('Error during token exchange:', err);
                // ERROR CASE
                console.error('Token exchange failed. Redirecting to login...');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setTimeout(() => router.push('/login'), 3000);
            }
        };

        exchangeToken();

    }, [searchParams, router, setUser]);

    return (
        <CallbackContainer>
            <Message>{error || message}</Message>
        </CallbackContainer>
    );
}
