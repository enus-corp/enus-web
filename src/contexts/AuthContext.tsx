'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { refreshToken as getRefreshToken } from '@/services/auth';
import { isTokenExpired, getTokenRemainingTime } from '@/utils/jwt';

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    router.replace('/login');
  };

  const refreshAccessToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      // Check if refresh token is expired
      if (isTokenExpired(refreshTokenValue)) {
        throw new Error('Refresh token expired');
      }

      const response = await getRefreshToken({ refreshToken: refreshTokenValue });
      const { accessToken : newAccessToken, refreshToken } = response;

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  };

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      console.log('Checking and refreshing token...');
      const accessToken = localStorage.getItem('accessToken');
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshTokenValue) {
        logout();
        return;
      }

      // Check if access token is expired or about to expire (within 5 minutes)
      const remainingTime = getTokenRemainingTime(accessToken);
      if (remainingTime === null) {
        logout();
        return;
      }

      // If token is expired, try to refresh
      if (remainingTime <= 0) {
        await refreshAccessToken();
        return;
      }

      // If token will expire in less than 5 minutes, refresh proactively
      if (remainingTime < 5 * 60 * 1000) { // 5 minutes in milliseconds
        console.log('Refreshing token...');
        await refreshAccessToken();
        return;
      }

      // Token is still valid
      setIsAuthenticated(true);
    };

    checkAndRefreshToken();

    // Set up periodic token check
    const interval = setInterval(checkAndRefreshToken, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 