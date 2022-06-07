import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LRoutes from './LRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ACB138',
      contrastText: 'white',
    },
  },
});

export default function ThemeUsage() {
  return (
    <ThemeProvider theme={theme}>
      <LRoutes />
    </ThemeProvider>
  );
}
