'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Avenir:wght@400;800&family=Poppins:wght@400&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Avenir', sans-serif;
    background-color: #FFFFFF;
  }
`;

export default GlobalStyle; 