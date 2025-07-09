import { ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { SessionProvider } from './contexts/SessionProvider';
import './index.css';
import QueryClientProvider from './providers/query-client-provider';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <QueryClientProvider />
      </SessionProvider>
    </ThemeProvider>
  </StrictMode>
);
