import { createTheme, ThemeOptions } from '@mui/material/styles';

const commonTypography = {
  fontFamily: '"Inter", "Poppins", "DM Sans", sans-serif',
  h1: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 700,
  },
  h2: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
  },
  h3: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
  },
  h4: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
  },
  h5: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
  },
  h6: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
  },
  body1: {
    fontFamily: '"Inter", sans-serif',
  },
  body2: {
    fontFamily: '"Inter", sans-serif',
  },
  button: {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 600,
    textTransform: 'none' as const,
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#14b8a6', // Teal
      light: '#2dd4bf',
      dark: '#0d9488',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#06b6d4', // Cyan
      light: '#22d3ee',
      dark: '#0891b2',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: commonTypography,
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        },
      },
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8', // Lighter indigo for dark mode
      light: '#a5b4fc',
      dark: '#6366f1',
    },
    secondary: {
      main: '#2dd4bf', // Lighter teal for dark mode
      light: '#5eead4',
      dark: '#14b8a6',
    },
    error: {
      main: '#f87171',
      light: '#fca5a5',
      dark: '#ef4444',
    },
    warning: {
      main: '#fbbf24', // Amber
      light: '#fcd34d',
      dark: '#f59e0b',
    },
    info: {
      main: '#22d3ee', // Cyan
      light: '#67e8f9',
      dark: '#06b6d4',
    },
    success: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#10b981',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(30, 41, 59, 0.8)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  typography: commonTypography,
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)',
          border: '1px solid rgba(129, 140, 248, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(129, 140, 248, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: '0 4px 14px rgba(129, 140, 248, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(129, 140, 248, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)',
        },
      },
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
