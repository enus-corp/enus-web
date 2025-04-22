'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios'; // Keep axios import for isAxiosError
// import { AxiosError } from 'axios'; // Remove unused import
import axiosInstance from '@/lib/axios';
import { useUser } from '@/contexts/UserContext';
import styled from 'styled-components';
import { Token } from '@/types/token'; // Use Token, remove TokenResponse
import { GeneralServerResponse } from '@/types/serverResponse'; // Import the response type
import { UserDTO } from '@/types/user';

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
                console.log('Exchanging temporary token...');
                console.log("temp token -> ", tempToken);

                // Correctly type the expected response
                const response = await axiosInstance.post<GeneralServerResponse<{token: Token, user: UserDTO}|null>>(
                    '/api/oauth/exchange-token',
                    { tempToken: tempToken }
                );

                console.log('response -> ', response);

                if (response.data) {
                    if (!response.data.error) {
                        // SUCCESS CASE
                        const { accessToken, refreshToken } = response.data.data!.token;
                        console.log('Tokens received successfully.');
        
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);

                        const infoRequired = needsAdditionalInfo(response.data.data!.user);
                        if (infoRequired) {
                            router.push('/onboarding')
                        } else {
                            setMessage('Authentication successful! Redirecting...');
                            router.push('/chat'); // Redirect on success
                        }
                    } else {
                        // ERROR CASE
                        const errorMessage = response.data.message || 'Token exchange failed (unknown reason).';
                        console.error('Token exchange failed:', errorMessage);
                        setError(`Authentication failed: ${errorMessage}. Redirecting to login...`);
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        setTimeout(() => router.push('/login'), 3000);
                    }
                } else {
                    throw new Error('Invalid response structure from server.');
                }
            } catch (err) {
                console.error('Error during token exchange:', err);
                let errorMessage = 'An unexpected error occurred during authentication.';

                if (axios.isAxiosError(err) && err.response) {
                    const errorData = err.response.data as GeneralServerResponse<null>;
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }

                setError(`Authentication error: ${errorMessage}. Redirecting to login...`);
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
