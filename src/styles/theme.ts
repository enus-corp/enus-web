import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    border: '#E5E5EA',
    error: '#FF3B30',
    success: '#34C759',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  body: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  textMuted: '#999999',
  buttonPrimaryBg: '#007AFF',
  buttonPrimaryText: '#FFFFFF',
  buttonPrimaryHoverBg: '#0056B3',
  inputBg: '#FFFFFF',
  inputBorder: '#E5E5EA',
  inputFocusBorder: '#007AFF',
  inputFocusShadow: '0 0 0 2px rgba(0, 122, 255, 0.2)',
  sidebarBg: '#F2F2F7',
  sidebarBorder: '#E5E5EA',
  sidebarHoverBg: '#E5E5EA',
  sidebarActiveBg: '#D1D1D6',
  divider: '#E5E5EA',
  modalBg: '#FFFFFF',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  modalOptionBg: '#FFFFFF',
  modalOptionHoverBg: '#F2F2F7',
  messageUserBg: '#007AFF',
  messageAiBg: '#F2F2F7',
  messageAiBorder: '#E5E5EA',
  accent: '#007AFF',
  accentRgb: '0, 122, 255',
  cardBg: '#FFFFFF',
  cardShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    text: '#FFFFFF',
    border: '#38383A',
    error: '#FF453A',
    success: '#32D74B',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  body: '#000000',
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  textMuted: '#8E8E93',
  buttonPrimaryBg: '#0A84FF',
  buttonPrimaryText: '#FFFFFF',
  buttonPrimaryHoverBg: '#0070D1',
  inputBg: '#1C1C1E',
  inputBorder: '#38383A',
  inputFocusBorder: '#0A84FF',
  inputFocusShadow: '0 0 0 2px rgba(10, 132, 255, 0.2)',
  sidebarBg: '#1C1C1E',
  sidebarBorder: '#38383A',
  sidebarHoverBg: '#2C2C2E',
  sidebarActiveBg: '#3A3A3C',
  divider: '#38383A',
  modalBg: '#1C1C1E',
  modalOverlay: 'rgba(0, 0, 0, 0.7)',
  modalOptionBg: '#1C1C1E',
  modalOptionHoverBg: '#2C2C2E',
  messageUserBg: '#0A84FF',
  messageAiBg: '#2C2C2E',
  messageAiBorder: '#38383A',
  accent: '#0A84FF',
  accentRgb: '10, 132, 255',
  cardBg: '#1C1C1E',
  cardShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
}; 