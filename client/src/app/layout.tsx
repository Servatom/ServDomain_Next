import { AuthContextProvider } from "@/store/auth-context";
import "./globals.css";
import type { Metadata } from "next";
import LoginIcon from "@/components/LoginIcon";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "servdomain.",
  description: "Subdomain lending made possible.",
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
        <meta name="theme-color" content="#000000" />
        <meta name="og:title" content={"Servdomain."} />
        <meta
          name="og:image"
          content={"https://cdn.servatom.com/Servdomain/Thumbnail.png"}
        />
        <meta
          name="og:description"
          content={"Subdomain lending made possible."}
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
