import NavBar from "@/components/nav/nav-bar";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="container  h-screen bg-background ">{children}</div>
    </>
  );
}
