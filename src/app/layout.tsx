'use client';

import "./globals.css";
import { Provider } from 'react-redux';
import { themeStore } from '@/store/themeStore';
import StyledComponentsRegistry from "@/lib/registry";
import ThemeWrapper from '@/components/ThemeWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={themeStore}>
          <StyledComponentsRegistry>
            <ThemeWrapper>
              {children}
            </ThemeWrapper>
          </StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
