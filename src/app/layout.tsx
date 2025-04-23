import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalStyle from '../styles/global';
import { CustomThemeProvider } from '@/contexts/ThemeContext';
import { lightTheme } from "@/theme/theme";
import StyledComponentsRegistry from "@/lib/registry";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Avenir:wght@400;800&family=Poppins:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StyledComponentsRegistry>
          <CustomThemeProvider>
            <GlobalStyle theme={lightTheme} />
            {/* <Header /> */}
            {children}
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
