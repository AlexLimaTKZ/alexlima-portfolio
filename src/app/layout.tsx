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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ScrollProgress />
            <Header />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
