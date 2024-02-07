import type { ReactNode } from 'react';
import './globals.css';
import { outfit } from '@/Fonts/my_fonts';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieAI",
  description: "Explore filmes de alta qualidade com nossas recomendações de 1 a 10, abrangendo diversos gêneros para uma experiência cinematográfica diversificada.",
};

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