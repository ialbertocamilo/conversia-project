"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/buttons/button-theme-toggle";
import { useRecoilState } from "recoil";
import { authUserAtom } from "@/atoms/auth-user.atom";
import { useEffect } from "react";
import { getMe } from "@/api/auth/get-me";
import { STORAGE_VARIABLES } from "@/shared/constants";
import { useRouter } from "next/navigation";
import { useSocket } from "@/providers/socket-context.provider";
import { storage } from "@/lib/storage";

export default function NavBar() {
  const socket = useSocket();
  const router = useRouter();
  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  useEffect(() => {
    getMe().then((data) => {
      if (data)
      setAuthUser(data);
    });
  }, []);

  async function closeSession() {
    await socket?.emitClose();
    setAuthUser({
      _id: "",
      createdAt: "",
      name: undefined,
      username: undefined,
    });
    storage(STORAGE_VARIABLES.token).removeItem();
    router.push("/");
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-background h-25">
      <div className="container flex h-16 items-center justify-between ">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-semibold accent-muted">
            Conversia Chat App
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <span className="text-sm font-medium hover:text-primary transition-colors">
            {authUser?.name ? "Hello, " + authUser.name : ""}
          </span>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            prefetch={false}
            onClick={closeSession}
          >
            Cerrar sesión
          </Link>
          <ModeToggle />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <div className="grid gap-6 p-6">
              <Link
                href="#"
                className="text-lg font-medium hover:text-primary transition-colors"
                prefetch={false}
              >
                Cerrar sesión
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
