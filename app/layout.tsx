import type { Metadata } from "next";
import "./globals.css";
import TestLayout from "./layout/TestLayout";

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
      <body><TestLayout>{children}</TestLayout></body>
    </html>
  );
}
