import { AuthContextProvider } from "@/store/auth-context";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoginIcon from "@/components/LoginIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "servdomain.",
  description: "Made subdomain lending possible.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://servatom.com/servatom-logo-rounded.png"
        />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          <LoginIcon />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
