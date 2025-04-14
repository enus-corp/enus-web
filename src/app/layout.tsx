import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalStyle from '../styles/global';
import { UserProvider } from '@/contexts/UserContext';
import { CustomThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import { lightTheme } from "@/theme/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landing Page",
  description: "A beautiful landing page design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomThemeProvider>
          <GlobalStyle theme={lightTheme} />
          <Header />
          <UserProvider>
            {children}
          </UserProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
