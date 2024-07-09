'use client';

import * as React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
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
  },
});

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
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
