'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { useRootAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/userSlice';
import clientApi from '@/services/clientApi';
import { CallbackContainer, Message } from './style';
import { OAuthCallbackResponse } from '@/types/response/oauthCallbackResponse';

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
            console.log('OAuth Callback - No tempToken found in URL parameters');
            setError('Temporary token not found. Redirecting to login...');
            setTimeout(() => router.replace('/login'), 3000);
            return;
        }

        const needsAdditionalInfo = (user: User) : boolean => {
            return (
                !user.firstName || 
                !user.lastName || 
                !user.username || 
                !user.email || 
                !user.gender || 
                !user.age
            );
        }

        const handleTokenExchange = async () => {
            try {
                const response = await clientApi.post<OAuthCallbackResponse>('/api/auth/exchangeToken', { tempToken });

                if (response.error) {
                    console.error('OAuth Callback - Server returned error:', response.error);
                    setError(response.message || 'Token exchange failed');
                    return;
                }

                const { user } = response.data!;
                
                const infoRequired = needsAdditionalInfo(user);
                
                if (infoRequired) {
                    router.replace("/onboarding");
                } else {
                    dispatch(setUser(user));
                    setMessage("Authentication successful! Redirecting...");
                    setTimeout(() => router.replace('/chat'), 2000);
                }
            } catch (err) {
                console.error('OAuth Callback - Token exchange failed:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
                // No need to clear tokens - they're in HTTP-only cookies
                setTimeout(() => router.replace('/login'), 3000);
            }
        };

        handleTokenExchange();
    }, [searchParams, router, dispatch]);

    return (
        <CallbackContainer>
            <Message>{error || message}</Message>
        </CallbackContainer>
    );
}
