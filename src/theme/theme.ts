// theme.js - Exportable theme configuration for your Next.js application

// Define base colors for easier reference
const colors = {
    primary: '#252525', // Your primary dark color
    primary_rgb: '37, 37, 37',
    secondary: '#A0D9B1', // Your light green accent
    secondary_rgb: '160, 217, 177',
    white: '#FFFFFF',
    black: '#000000',
    grey_lightest: '#F8F9FA',
    grey_lighter: '#E9ECEF',
    grey_light: '#DEE2E6',
    grey_medium: '#CED4DA',
    grey_dark: '#ADB5BD',
    grey_darker: '#6C757D',
    grey_darkest: '#495057',
    red_error: '#721C24',
    red_error_bg: '#F8D7DA',
    green_success: '#0F5132',
    green_success_bg: '#D1E7DD',
};

export const lightTheme = {
    body: colors.white,
    text: colors.primary,
    textSecondary: colors.grey_darker,
    textMuted: colors.grey_dark,
    buttonPrimaryBg: colors.primary,
    buttonPrimaryText: colors.white,
    buttonPrimaryHoverBg: colors.grey_darkest,
    inputBg: colors.white,
    inputBorder: colors.grey_medium,
    inputFocusBorder: colors.secondary,
    inputFocusShadow: `rgba(${colors.secondary_rgb}, 0.3)`,
    sidebarBg: colors.grey_lightest,
    sidebarBorder: colors.grey_light,
    sidebarHoverBg: colors.grey_lighter,
    sidebarActiveBg: `rgba(${colors.secondary_rgb}, 0.2)`,
    divider: colors.grey_light,
    modalBg: colors.white,
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
    modalOptionBg: colors.grey_lightest,
    modalOptionHoverBg: colors.grey_lighter,
    messageUserBg: colors.grey_lighter,
    messageAiBg: colors.grey_lightest,
    messageAiBorder: colors.secondary,
    accent: colors.secondary,
    accentRgb: colors.secondary_rgb,
    cardBg: colors.white,
    cardShadow: 'rgba(0, 0, 0, 0.1)',
    // ... add other specific light theme colors
};

export const darkTheme = {
    body: colors.primary,
    text: colors.grey_lighter, // Light text on dark background
    textSecondary: colors.grey_dark,
    textMuted: colors.grey_darker,
    buttonPrimaryBg: colors.grey_lightest,
    buttonPrimaryText: colors.primary,
    buttonPrimaryHoverBg: colors.grey_light,
    inputBg: colors.grey_darkest,
    inputBorder: colors.grey_darker,
    inputFocusBorder: colors.secondary,
    inputFocusShadow: `rgba(${colors.secondary_rgb}, 0.4)`,
    sidebarBg: colors.grey_darkest, 
    sidebarBorder: colors.grey_darker,
    sidebarHoverBg: colors.grey_darkest, // Maybe slightly lighter/darker
    sidebarActiveBg: `rgba(${colors.secondary_rgb}, 0.15)`,
    divider: colors.grey_darker,
    modalBg: colors.grey_darkest,
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    modalOptionBg: colors.grey_darker,
    modalOptionHoverBg: colors.grey_darkest, // Maybe slightly lighter/darker
    messageUserBg: colors.grey_darkest,
    messageAiBg: '#343A40', // Slightly different dark
    messageAiBorder: colors.secondary,
    accent: colors.secondary,
    accentRgb: colors.secondary_rgb,
    cardBg: colors.grey_darkest,
    cardShadow: 'rgba(255, 255, 255, 0.05)',
    // ... add other specific dark theme colors
};

// Keep common theme elements (optional, or merge into light/dark)
export const commonTheme = {
    fonts: {
        sans: "'Avenir', sans-serif",
        poppins: "'Poppins', sans-serif",
        // ... other fonts
    },
    // ... spacing, breakpoints, radii, shadows etc.
    // You might need different shadows for light/dark
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        // ... other shadows
    },
};

// Deprecate or remove the old monolithic theme export if not needed
// export default oldThemeObject;