'use client';

import { appStore } from '@/store/appStore';
import React from 'react';
import { Provider } from 'react-redux';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={appStore}>
      {children}
    </Provider>
  );
} 