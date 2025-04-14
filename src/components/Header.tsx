'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';
import { lightTheme } from '@/theme/theme';

type StyledProps = { theme: typeof lightTheme };

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 64px; // Match LandingPage padding?
  background-color: ${({ theme }: StyledProps) => theme.body};
  border-bottom: 1px solid ${({ theme }: StyledProps) => theme.divider};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const Logo = styled.div`
  font-family: 'Avenir', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: ${({ theme }: StyledProps) => theme.text};
`;

const ToggleButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }: StyledProps) => theme.textSecondary};
  color: ${({ theme }: StyledProps) => theme.textSecondary};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }: StyledProps) => theme.sidebarHoverBg};
    border-color: ${({ theme }: StyledProps) => theme.text};
    color: ${({ theme }: StyledProps) => theme.text};
  }
`;

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Determine if the toggle should be shown (only on landing page for now)
  const showToggle = pathname === '/';

  return (
    <HeaderContainer>
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <Logo>Enus</Logo> 
      </Link>
      {showToggle && (
        <ToggleButton onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </ToggleButton>
      )}
    </HeaderContainer>
  );
};

export default Header; 