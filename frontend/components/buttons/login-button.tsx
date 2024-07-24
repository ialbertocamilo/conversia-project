'use client'
import {Button} from "@/components/ui/button";
import {logIn} from "@/api/auth/login";
import {useRouter} from "next/navigation";
import {useStorage} from "@/hooks/useStorage";
import {STORAGE_VARIABLES} from "@/shared/constants";

export default function LoginButton({data}: { data: { username: string, password: string } }) {

    const router = useRouter()

    const storage = useStorage(STORAGE_VARIABLES.token)
    const doLogin = async () => {
        console.log("Do login")
        const result = await logIn(data)
        if (result) {
            storage.set(result.access_token)
            router.push('/home')
        }
        console.log("Sign in ", result);

    };

    return (
        <Button className="w-full" onClick={doLogin}>
            Ingresar
        </Button>
    );
}