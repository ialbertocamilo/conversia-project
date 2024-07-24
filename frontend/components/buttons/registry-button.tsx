'use client'
import {Button} from "@/components/ui/button";
import {register} from "@/api/auth/register";

export default function RegistryButton({data}: { data: { name: string, username: string, password: string } }) {
    const doRegister = async () => {
        const result = await register(data)
        console.log("User: ", result);
    };
    return (
        <Button className="w-full" onClick={doRegister}>
            Registrar
        </Button>
    );
}