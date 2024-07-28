"use client";
import { Button } from "@/components/ui/button";
import { logIn } from "@/api/auth/login";
import { useRouter } from "next/navigation";
import { STORAGE_VARIABLES } from "@/shared/constants";
import { useRecoilState } from "recoil";
import { authUserAtom } from "@/atoms/auth-user.atom";
import { storage } from "@/lib/storage";

export default function LoginButton({
  data,
}: {
  data: { username: string; password: string };
}) {
  const router = useRouter();

  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  const doLogin = async () => {
    const result = await logIn(data);
    if (result) {
      storage(STORAGE_VARIABLES.token).set(result.access_token);
      setAuthUser(result.user);
      router.push("/home");
    }
  };

  return (
    <Button className="w-full" onClick={doLogin}>
      Ingresar
    </Button>
  );
}
