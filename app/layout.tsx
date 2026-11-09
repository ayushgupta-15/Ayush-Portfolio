import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-display", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Ayush Gupta | Software engineer",
  description:
    "Software engineer and final-year ECE student at DTU. Full-stack and AI products, plus kernels, compilers and RTL.",
  openGraph: {
    title: "Ayush Gupta | Software engineer",
    description: "Full-stack and AI products, plus kernels, compilers and RTL.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
