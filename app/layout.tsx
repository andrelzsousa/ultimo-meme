import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O Último Meme da Terra | S.R.A.C.P.",
  description: "Sistema de Recuperação de Artefatos Culturais Proibidos - Um mockumentary interativo sobre o fim do humor digital",
  keywords: ["meme", "mockumentary", "vaporwave", "cultura digital", "arte interativa"],
  authors: [{ name: "Arqueólogo Digital" }],
  openGraph: {
    title: "O Último Meme da Terra",
    description: "Em um futuro onde memes foram proibidos, um historiador busca o último fragmento de humor da humanidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0612] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
