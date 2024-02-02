import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Sixtyfour&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
