
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import Link from "next/link"

export default function ChatComponent() {
    return (
            <div className="mt-16 flex flex-1">
                <div className="hidden w-64 border-r bg-muted/40 p-4 sm:block">
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
                <div className="flex flex-1 flex-col">
                    <div className="flex-1 overflow-auto p-4">
                        <div className="grid gap-4">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>AC</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 rounded-lg bg-muted p-4 text-sm">
                                    <p>Hey everyone! How's it going?</p>
                                    <div className="text-xs text-muted-foreground">Acme Co. • 2:30 PM</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Doing great, thanks for asking!</p>
                                    <div className="text-xs text-primary-foreground/70">Jill Davis • 2:32 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>KS</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 rounded-lg bg-muted p-4 text-sm">
                                    <p>Awesome, I'm excited for the new product launch!</p>
                                    <div className="text-xs text-muted-foreground">Kara Smith • 2:35 PM</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4 justify-end">
                                <div className="grid gap-1 rounded-lg bg-primary p-4 text-sm text-primary-foreground">
                                    <p>Me too, it's going to be huge!</p>
                                    <div className="text-xs text-primary-foreground/70">Mia Jenson • 2:37 PM</div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>MJ</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                    <div className="border-t p-4  bottom-0 bg-secondary">
                        <form className="flex items-center gap-2">
                            <Input type="text" placeholder="Type your message..." className="flex-1"/>
                            <Button type="submit">
                                <SendIcon className="h-4 w-4"/>
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

function SearchIcon(props) {
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
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
        </svg>
    )
}


function SendIcon(props) {
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
            <path d="m22 2-7 20-4-9-9-4Z"/>
            <path d="M22 2 11 13"/>
        </svg>
    )
}


function WebcamIcon(props) {
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
            <circle cx="12" cy="10" r="8"/>
            <circle cx="12" cy="10" r="3"/>
            <path d="M7 22h10"/>
            <path d="M12 22v-4"/>
        </svg>
    )
}


function XIcon(props) {
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
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}