import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ouroboros — Autonomous AI Security",
  description: "Ouroboros continuously finds vulnerabilities across your full stack, generates fixes, re-attacks the patched code, then delivers PRs you can trust.",
  keywords: ["cybersecurity", "AI security", "autonomous security", "vulnerability scanning", "SAST", "DAST"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
