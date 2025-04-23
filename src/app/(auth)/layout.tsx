'use client';

import React from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
        <UserProvider>
        {children}
        </UserProvider>
    </AuthProvider>
  );
} 