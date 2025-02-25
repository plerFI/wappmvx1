import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "../app/components/Navbar";
import App from "./App";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VaultFIxBeefy",
  description:
    "An MetaVault with Beefy Vaults",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <Navbar />
          <App>
            {children}
          </App>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
