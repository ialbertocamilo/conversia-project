import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import NavBar from "@/components/nav/nav-bar";
import {cn} from "@/lib/utils";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Conversia Chat App", description: "Codigo creado por Alberto Camilo Rodriguez Vizcarra",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body className={cn(
            inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NavBar/>
            <div className="container  h-screen bg-background ">
                {children}
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
