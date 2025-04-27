'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { UserDTO } from '@/types/user';
import { exchangeToken as exchange } from '@/services/auth';
import { useRootAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/userSlice';

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
    const dispatch = useRootAppDispatch();

    const [message, setMessage] = useState('Processing authentication...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const tempToken = searchParams.get('tempToken');
        console.log('OAuth Callback - Received tempToken:', tempToken ? 'Present' : 'Missing');

        if (!tempToken) {
            console.log('OAuth Callback - No tempToken found in URL parameters (expected in some cases)');
            setError('Temporary token not found. Redirecting to login...');
            setTimeout(() => router.replace('/login'), 3000);
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
                console.log('OAuth Callback - Attempting token exchange...');
                const response = await exchange({tempToken: tempToken});
                console.log('OAuth Callback - Token exchange successful:', response);
                
                const { token, user } = response;
                localStorage.setItem('accessToken', token.accessToken);
                localStorage.setItem('refreshToken', token.refreshToken);

                const infoRequired = needsAdditionalInfo(user);
                
                if (infoRequired) {
                    // redirect to onboarding page 
                    router.replace("/onboarding");
                } else {
                    // additional info is not required, set user and redirect to chat
                    dispatch(setUser(user));
                    setMessage("Authentication successful! Redirecting...");
                    setTimeout(() => router.replace('/chat'), 2000);
                }
            } catch (err) {
                console.error('OAuth Callback - Token exchange failed:', err);
                if (err instanceof Error) {
                    console.error('OAuth Callback - Error details:', err.message);
                }
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setTimeout(() => router.replace('/login'), 3000);
            }
        };

        exchangeToken();

    }, [searchParams, router, dispatch]);

    return (
        <CallbackContainer>
            <Message>{error || message}</Message>
        </CallbackContainer>
    );
}
