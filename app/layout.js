"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth";
import ProtectedLayout from "./ProtectedLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>home</title>
        <link rel="icon" href={"/favicon.jpg"} />
      </head>
      <body className="text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
