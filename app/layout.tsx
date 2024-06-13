import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TestLayout from "./layout/TestLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IQ test by Jaarabytes",
  description: "Jaarabytes is a genius!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><TestLayout>{children}</TestLayout></body>
    </html>
  );
}
