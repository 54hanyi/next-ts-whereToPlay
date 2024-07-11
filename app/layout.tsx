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
      main: '#0284c7',
    },
    secondary: {
      main: '#9ddff9',
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
        background: `
          linear-gradient(rgba(175, 229, 251, 0.3), rgba(175, 229, 251, 0.1)),
          url('https://next-ts-where-to-play.vercel.app/images/background.webp'),
          url('https://next-ts-where-to-play.vercel.app/images/background.jpg')
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'top',
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
        <link rel="preload" href="https://next-ts-where-to-play.vercel.app/images/background.webp" as="image" />
        <link rel="preload" href="https://next-ts-where-to-play.vercel.app/images/background.jpg" as="image" />
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
