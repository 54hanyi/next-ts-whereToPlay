'use client';

import * as React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import createEmotionCache from './utils/createEmotionCache';
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: 'rgb(255, 247, 228)',
      paper: 'rgb(255, 247, 228)',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        color: 'rgb(var(--foreground-rgb))',
        background: 'linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
      },
      '.text-balance': {
        textWrap: 'balance',
      },
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {globalStyles}
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
