import 'styled-components';
import { lightTheme } from '../theme/theme'; 

type Theme = typeof lightTheme; 

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 