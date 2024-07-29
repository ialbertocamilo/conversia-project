"use client";
import { Button } from "@/components/ui/button";
import { register } from "@/api/auth/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegistryButton({
  data,
}: {
  data: { name: string; username: string; password: string };
}) {
  const router = useRouter();
  const doRegister = async () => {
    const result = await register(data);
    if (result?.statusCode == 201) {
      toast.success(`Registro exitoso.`);
    } else if (result?.statusCode == 409) {
      toast.error(`'Username' ya existe`);
    }
  };
  return (
    <Button className="w-full" onClick={doRegister}>
      Registrar
    </Button>
  );
}
