'use client'
import * as React from "react";
import {useEffect} from "react";
import {useStorage} from "@/hooks/useStorage";
import {STORAGE_VARIABLES} from "@/shared/constants";
import {useRouter} from "next/navigation";

export function AuthProvider({children, ...props}: { children: React.ReactNode }) {

    const router = useRouter()
    const storage = useStorage(STORAGE_VARIABLES.token)
    useEffect(() => {
        const token = storage.get()
        if (!token)
            router.push('/')
    }, [router]);
    return <>{children}</>
}
