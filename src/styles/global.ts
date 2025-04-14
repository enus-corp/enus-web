'use client';

import { createGlobalStyle } from 'styled-components';
import { lightTheme } from '../theme/theme'; // Import theme type source

// Define a type for the theme prop directly
type StyledProps = { theme: typeof lightTheme };

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Avenir:wght@400;800&family=Poppins:wght@400&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Avenir', sans-serif; 
    /* Access theme via explicitly typed prop */
    background-color: ${({ theme }: StyledProps) => theme.body};
    color: ${({ theme }: StyledProps) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

export default GlobalStyle; 