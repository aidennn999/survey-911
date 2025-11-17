import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
 title: "Survey Pelanggan - Kritik & Saran",
 description:
  "Platform survey pelanggan yang aman dan anonym untuk menyampaikan kritik dan saran",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
 return (
  <html lang="id">
   <body className={inter.className}>{children}</body>
  </html>
 );
}
