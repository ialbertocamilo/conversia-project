"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LoginButton from "@/components/buttons/login-button";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import RegistryButton from "@/components/buttons/registry-button";
import { getMe } from "@/api/auth/get-me";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getMe().then(async (data) => {
      if (data)
      router.push("/home");
    });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="registry">Registro</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Iniciar sesión
              </CardTitle>
              <CardDescription>Ingresa tus datos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                />
              </div>
              <LoginButton data={{ username, password }} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="registry">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Registro</CardTitle>
              <CardDescription>Ingresa tus datos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <RegistryButton data={{ name, username, password }} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
