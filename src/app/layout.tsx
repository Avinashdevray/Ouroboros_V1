import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
