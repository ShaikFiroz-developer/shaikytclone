"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Suspense } from "react";
import Loading from "./loader";
import Header1 from "@/components/head";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>home</title>

        <link rel="icon" href={"/favicon.jpg"} />
      </head>
      <body className="text-white">
        <SessionProvider>
          <Header1 />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
