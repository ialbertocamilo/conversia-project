'use client'
import {Button} from "@/components/ui/button";
import {register} from "@/api/auth/register";
import {useRouter} from "next/navigation";

export default function RegistryButton({data}: { data: { name: string, username: string, password: string } }) {
    const router = useRouter()
    const doRegister = async () => {
        const result = await register(data)
        if (result) router.push('/')
    };
    return (
        <Button className="w-full" onClick={doRegister}>
            Registrar
        </Button>
    );
}