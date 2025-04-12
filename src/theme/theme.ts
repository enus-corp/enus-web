// theme.js - Exportable theme configuration for your Next.js application

const theme = {
    // Colors
    colors: {
        primary: {
            main: '#3563E9',
            light: '#4E74F0',
            dark: '#1A49C2',
            50: '#EBF0FF',
            100: '#D6E0FF',
            200: '#ADC2FF',
            300: '#85A3FF',
            400: '#5C85FF',
            500: '#3563E9',
            600: '#2A50BA',
            700: '#1F3C8C',
            800: '#15295D',
            900: '#0A152F',
        },
        secondary: {
            main: '#FF8A65',
            light: '#FFA08C',
            dark: '#E06E48',
            50: '#FFF0EB',
            100: '#FFE0D6',
            200: '#FFC2AD',
            300: '#FFA384',
            400: '#FF8A65',
            500: '#FF7043',
            600: '#E65C34',
            700: '#BF4826',
            800: '#993417',
            900: '#732609',
        },
        tertiary: {
            main: '#54B435',
            light: '#72C957',
            dark: '#3F8A27',
            50: '#EBFAE6',
            100: '#D6F5CD',
            200: '#ADEAAA',
            300: '#85E087',
            400: '#5CD663',
            500: '#54B435',
            600: '#429029',
            700: '#306C1E',
            800: '#1F4812',
            900: '#0F2409',
        },
        text: {
            primary: '#1A202C',
            secondary: '#4A5568',
            tertiary: '#718096',
            muted: '#A0AEC0',
            inverse: '#FFFFFF',
        },
        background: {
            main: '#F7F9FC',
            card: '#FFFFFF',
            muted: '#F1F3F9',
        },
        status: {
            success: '#10B981',
            warning: '#FBBF24',
            error: '#EF4444',
            info: '#3B82F6',
        },
        border: {
            main: '#E2E8F0',
            light: '#EDF2F7',
            focus: '#3563E9',
        },
        gradient: {
            primary: 'linear-gradient(135deg, #3563E9 0%, #4E74F0 100%)',
            secondary: 'linear-gradient(135deg, #FF8A65 0%, #FFA08C 100%)',
        },
    },

    // Typography
    fonts: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        serif: "'Playfair Display', Georgia, Cambria, 'Times New Roman', Times, serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    fontSizes: {
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
    },
    fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    lineHeights: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },

    // Spacing
    space: {
        0: '0',
        1: '0.25rem',  // 4px
        2: '0.5rem',   // 8px
        3: '0.75rem',  // 12px
        4: '1rem',     // 16px
        5: '1.25rem',  // 20px
        6: '1.5rem',   // 24px
        8: '2rem',     // 32px
        10: '2.5rem',  // 40px
        12: '3rem',    // 48px
        16: '4rem',    // 64px
        20: '5rem',    // 80px
        24: '6rem',    // 96px
        32: '8rem',    // 128px
    },

    // Breakpoints
    breakpoints: {
        xs: '0px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    // Borders
    borderWidths: {
        none: '0',
        thin: '1px',
        thick: '2px',
        thicker: '4px',
    },
    borderStyles: {
        solid: 'solid',
        dashed: 'dashed',
        dotted: 'dotted',
    },
    radii: {
        none: '0',
        sm: '0.125rem',  // 2px
        md: '0.25rem',   // 4px
        lg: '0.5rem',    // 8px
        xl: '0.75rem',   // 12px
        '2xl': '1rem',   // 16px
        '3xl': '1.5rem', // 24px
        full: '9999px',
    },

    // Shadows
    shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },

    // Z-indices
    zIndices: {
        0: 0,
        10: 10,
        20: 20,
        30: 30,
        40: 40,
        50: 50,
        auto: 'auto',
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        toast: 1600,
        tooltip: 1700,
    },

    // Transitions
    transitions: {
        duration: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms',
        },
        timing: {
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },

    // Component Specific
    components: {
        // Button variants
        buttons: {
            primary: {
                backgroundColor: '#3563E9',
                color: '#FFFFFF',
                hoverBg: '#1A49C2',
                activeBg: '#0E2B75',
                focusRing: '0 0 0 3px rgba(53, 99, 233, 0.4)',
            },
            secondary: {
                backgroundColor: '#FF8A65',
                color: '#FFFFFF',
                hoverBg: '#E06E48',
                activeBg: '#BF4826',
                focusRing: '0 0 0 3px rgba(255, 138, 101, 0.4)',
            },
            tertiary: {
                backgroundColor: '#54B435',
                color: '#FFFFFF',
                hoverBg: '#3F8A27',
                activeBg: '#306C1E',
                focusRing: '0 0 0 3px rgba(84, 180, 53, 0.4)',
            },
            outline: {
                backgroundColor: 'transparent',
                color: '#3563E9',
                borderColor: '#3563E9',
                hoverBg: 'rgba(53, 99, 233, 0.1)',
                activeBg: 'rgba(53, 99, 233, 0.2)',
                focusRing: '0 0 0 3px rgba(53, 99, 233, 0.4)',
            },
            ghost: {
                backgroundColor: 'transparent',
                color: '#3563E9',
                hoverBg: 'rgba(53, 99, 233, 0.1)',
                activeBg: 'rgba(53, 99, 233, 0.2)',
                focusRing: '0 0 0 3px rgba(53, 99, 233, 0.4)',
            },
        },

        // Card variants
        cards: {
            default: {
                backgroundColor: '#FFFFFF',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                padding: '1.5rem',
            },
            interactive: {
                backgroundColor: '#FFFFFF',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                padding: '1.5rem',
                transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                hoverTransform: 'translateY(-4px)',
                hoverBoxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            flat: {
                backgroundColor: '#FFFFFF',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                border: '1px solid #E2E8F0',
            },
        },

        // Input variants
        inputs: {
            default: {
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                focusBorderColor: '#3563E9',
                focusRing: '0 0 0 3px rgba(53, 99, 233, 0.4)',
            },
        },
    },
};

export default theme;