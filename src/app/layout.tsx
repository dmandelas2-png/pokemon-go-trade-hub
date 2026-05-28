import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

export const metadata: Metadata = {
  title: 'PokeTrade Hub - Pokémon GO Trade Hub',
  description: 'Your ultimate Pokemon GO trading companion. Find and trade Pokemon with trainers worldwide, track raids, and stay updated on events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${pressStart2P.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-pixel-dark text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
