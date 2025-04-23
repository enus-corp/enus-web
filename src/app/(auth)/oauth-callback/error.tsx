'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({error, reset}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error('OAuth callback error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Return to Login
            </button>
        </div>
    );
}