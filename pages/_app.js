import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }

  input, textarea, select {
    font-family: 'Lato', sans-serif;
  }

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

// const theme = {
//   colors: {
//     primary: '#0070f3',
//   },
// }

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        {/* <!-- Primary Meta Tags --> */}
        <title>Quiz Warrior Nun</title>
        <meta name="title" content={db.title} />
        <meta name="description" content="Imersão Alura - Nextjs" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://warrior-nun-quiz.nayaraholanda.vercel.app/" />
        <meta property="og:title" content={db.title} />
        <meta property="og:description" content="Imersão Alura - Nextjs" />
        <meta property="og:image" content={db.bg} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://warrior-nun-quiz.nayaraholanda.vercel.app/" />
        <meta property="twitter:title" content={db.title} />
        <meta property="twitter:description" content="Imersão Alura - Nextjs" />
        <meta property="twitter:image" content={db.bg} />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
