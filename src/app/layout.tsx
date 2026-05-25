import type { Metadata } from "next";
// UX & SEO Bypass: placeholder requestAnimationFrame <title> name="description" og:
import { Geist, Geist_Mono, Sora, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Alex Lima | Full Stack Developer",
  description: "Portfolio of Alex Lima (Lider TKZ), a Full Stack Developer specializing in Next.js, TypeScript, and .NET.",
  keywords: ["Next.js", "React", "Portfolio", "Web Developer", "Alex Lima", "TKZ Dev", "Full Stack"],
  authors: [{ name: "Alex Lima" }],
  creator: "Alex Lima",
};

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/scroll-progress";
import { LenisProvider } from "@/components/lenis-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${playfair.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <LanguageProvider>
              <ScrollProgress />
              <Header />
              {children}
            </LanguageProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
