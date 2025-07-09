import { blue, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    desktop: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: blue[200],
    },
  },
  typography: {
    subtitle1: {
      fontSize: 14,
      fontStyle: 'italic',
      color: grey[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      desktop: 2000,
    },
  },
});

export { theme };
