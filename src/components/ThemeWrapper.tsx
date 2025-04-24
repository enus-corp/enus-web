'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { lightTheme, darkTheme } from '@/styles/theme';
import { createGlobalStyle } from 'styled-components';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${geistSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
} 