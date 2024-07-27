import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import NavBar from "@/components/nav/nav-bar";
import {cn} from "@/lib/utils";
import {AuthProvider} from "@/components/auth-provider";
import RecoilContextProvider from "@/providers/recoil-context-provider";
import {SocketProvider} from "@/providers/socket-context.provider";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Conversia Chat App", description: "Codigo creado por Alberto Camilo Rodriguez Vizcarra",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (<html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className)}>
        <RecoilContextProvider>
            <AuthProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <SocketProvider>
                        <NavBar/>
                        <div className="container  h-screen bg-background ">

                            {children}
                        </div>
                    </SocketProvider>
                </ThemeProvider>
            </AuthProvider>
        </RecoilContextProvider>
        </body>
        </html>);
}
