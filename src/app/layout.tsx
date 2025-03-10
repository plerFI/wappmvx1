import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import App from "./App";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuctOZxBeefy",
  description:
    "An MetaVault for Beefy Vaults",
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
          <App>
            {children}
          </App>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
