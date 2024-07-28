"use client";
import * as React from "react";
import { useEffect } from "react";
import { STORAGE_VARIABLES } from "@/shared/constants";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

export function AuthProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const token = storage(STORAGE_VARIABLES.token).get();
    if (!token) router.push("/");
  }, [router]);
  return <>{children}</>;
}
