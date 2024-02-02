import type { ReactNode } from 'react';
import './globals.css';
import { outfit } from '@/Fonts/my_fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
