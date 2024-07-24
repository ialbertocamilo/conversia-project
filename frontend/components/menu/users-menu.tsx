import {SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

interface UsersMenuProps {
    className?: string
}

export default function UsersMenu({className}: UsersMenuProps) {
    return (
        <>
            <div className={cn(className)}>
                <div className="hidden  border-r bg-muted/40 sm:block">
                    <div className="mb-4 flex items-center gap-2">
                        <SearchIcon className="h-4 w-4 text-muted-foreground"/>
                        <Input type="search" placeholder="Search users..."
                               className="w-full bg-background shadow-none"/>
                    </div>
                    <div className="grid gap-2">
                        <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                              prefetch={false}>
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src="/placeholder-user.jpg"/>
                                <AvatarFallback>AC</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium leading-none">Acme Co.</p>
                                <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500"/>
                                    <p className="text-xs text-muted-foreground">Online</p>
                                </div>
                            </div>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                              prefetch={false}>
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src="/placeholder-user.jpg"/>
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium leading-none">Jill Davis</p>
                                <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500"/>
                                    <p className="text-xs text-muted-foreground">Online</p>
                                </div>
                            </div>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                              prefetch={false}>
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src="/placeholder-user.jpg"/>
                                <AvatarFallback>KS</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium leading-none">Kara Smith</p>
                                <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500"/>
                                    <p className="text-xs text-muted-foreground">Online</p>
                                </div>
                            </div>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                              prefetch={false}>
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src="/placeholder-user.jpg"/>
                                <AvatarFallback>MJ</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <p className="text-sm font-medium leading-none">Mia Jenson</p>
                                <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full bg-green-500"/>
                                    <p className="text-xs text-muted-foreground">Online</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )

}


