'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ErrorContainer, ErrorMessage, ErrorDescription, ReturnButton } from './styles';

export default function OAuthErrorPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const errorType = searchParams.get('type');

    const getErrorMessage = () => {
        switch (errorType) {
            case 'invalid_provider':
                return 'Invalid OAuth Provider';
            case 'auth_failed':
                return 'Authentication Failed';
            default:
                return 'Something Went Wrong';
        }
    };

    const getErrorDescription = () => {
        switch (errorType) {
            case 'invalid_provider':
                return 'The selected authentication provider is not supported. Please try again with a valid provider.';
            case 'auth_failed':
                return 'The authentication process failed. Please try again.';
            default:
                return 'An unexpected error occurred during the authentication process. Please try again.';
        }
    };

    return (
        <ErrorContainer>
            <ErrorMessage>{getErrorMessage()}</ErrorMessage>
            <ErrorDescription>{getErrorDescription()}</ErrorDescription>
            <ReturnButton onClick={() => router.push('/login')}>
                Return to Login
            </ReturnButton>
        </ErrorContainer>
    );
} 