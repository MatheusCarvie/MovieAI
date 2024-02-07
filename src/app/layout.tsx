import type { ReactNode } from 'react';
import './globals.css';
import { outfit } from '@/Fonts/my_fonts';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieAI",
  description: "Explore filmes de alta qualidade com nossas recomendações de 1 a 10, abrangendo diversos gêneros para uma experiência cinematográfica diversificada.",
  other: {
    author: "Matheus Carvie",
    keywords: "Recomendação de Movies por AI, MovieAI, Projeto de recomendação de filmes do Matheus Carvie.",
    ['revisit-after']: "7 days",
    distribution: "global",
    robots: "index, follow",
    googlebot: "index, follow",
    ['apple-mobile-web-app-capable']: "yes",
    ['apple-mobile-web-app-status-bar-style']: "white",
    ['format-detection']: "telephone=no"
  }
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