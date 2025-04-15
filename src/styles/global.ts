'use client';

import { createGlobalStyle } from 'styled-components';
import { lightTheme } from '../theme/theme'; // Import theme type source

// Define a type for the theme prop directly
type StyledProps = { theme: typeof lightTheme };

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }: StyledProps) => theme.body};
    color: ${({ theme }: StyledProps) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

export default GlobalStyle; 