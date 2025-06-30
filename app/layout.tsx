import type { Metadata } from "next";
import { Inter,Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./anime-styles.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Manwha AI ",
  description: "Chat with AI companion with manwha-style interface",
  keywords: ["Manwha AI", "Manga", "manwha", "chatbot", "AI companion", "chat", "companion", "Sahil Gulihar", "open source"],
  openGraph: {
    images: 'meta/og-image.png',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
