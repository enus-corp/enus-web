import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
      error: string;
      success: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    body: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    buttonPrimaryBg: string;
    buttonPrimaryText: string;
    buttonPrimaryHoverBg: string;
    inputBg: string;
    inputBorder: string;
    inputFocusBorder: string;
    inputFocusShadow: string;
    sidebarBg: string;
    sidebarBorder: string;
    sidebarHoverBg: string;
    sidebarActiveBg: string;
    divider: string;
    modalBg: string;
    modalOverlay: string;
    modalOptionBg: string;
    modalOptionHoverBg: string;
    messageUserBg: string;
    messageAiBg: string;
    messageAiBorder: string;
    accent: string;
    accentRgb: string;
    cardBg: string;
    cardShadow: string;
  }
} 