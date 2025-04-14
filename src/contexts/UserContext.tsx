'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserDTO {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  isOauthUser: boolean;
}

interface UserContextType {
  user: UserDTO | null;
  setUser: (user: UserDTO | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 