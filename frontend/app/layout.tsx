import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/auth-provider";
import RecoilContextProvider from "@/providers/recoil-context-provider";
import React from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conversia Chat App",
  description: "Codigo creado por Alberto Camilo Rodriguez Vizcarra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        <RecoilContextProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
          </AuthProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
