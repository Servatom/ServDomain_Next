import { AuthContextProvider } from "@/store/auth-context";
import "./globals.css";
import type { Metadata } from "next";
import LoginIcon from "@/components/LoginIcon";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className="dark">
      <head>
        <link
          rel="icon"
          href="https://servatom.com/servatom-logo-rounded.png"
        />
      </head>
      <body>
        <AuthContextProvider>
          <LoginIcon />
          <Toaster />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
