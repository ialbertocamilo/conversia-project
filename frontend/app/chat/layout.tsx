import type { Metadata } from "next";
import NavBar from "@/components/nav/nav-bar";
import { SocketProvider } from "@/providers/socket-context.provider";
import React from "react";

export const metadata: Metadata = {
  title: "Conversia Chat App",
  description: "Codigo creado por Alberto Camilo Rodriguez Vizcarra",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <NavBar />
      <div className="container  h-screen bg-background ">{children}</div>
    </SocketProvider>
  );
}
