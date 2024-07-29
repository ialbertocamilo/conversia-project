import NavBar from "@/components/nav/nav-bar";
import { SocketProvider } from "@/providers/socket-context.provider";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>      <NavBar />
      <div className="container  h-screen bg-background ">{children}</div></>

  );
}
