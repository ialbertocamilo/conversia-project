import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {IMessage, MessengerType} from "@/interfaces/messages";
import UsersMenu from "@/components/menu/users-menu";
import {cn} from "@/lib/utils";
import {MoveHorizontalIcon} from "lucide-react";

const ChatMessage = ({data}: { data: IMessage }) => {
    if (data.type === MessengerType.SENDER) {
        return <SenderMessage data={data}/>;
    }
    return <ReceiverMessage data={data}/>;
};

const SenderMessage = ({data}: { data: IMessage }) => {
    return (
        <div className="flex items-start gap-3 justify-end">
            <div className="grid gap-1">
                <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">You</span>
                    </div>
                    <p className="text-sm">{data.message}</p>
                    <p>
                        <span className="text-muted-foreground text-xs/[13px] ">• {data.time}</span>
                    </p>
                </div>
            </div>
            <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg"/>
                <AvatarFallback>Yo</AvatarFallback>
            </Avatar>
        </div>
    );
};

const ReceiverMessage = ({data}: { data: IMessage }) => {
    return (
        <div className="grid gap-4 ">
            <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg"/>
                    <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <div className="bg-muted rounded-lg p-3 max-w-[75%]">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{data.author}</span>
                        </div>
                        <p className="text-sm">{data.message}</p>
                        <p>
                            <span className="text-muted-foreground text-xs/[13px] ">• {data.time}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ChatComponent() {
    const messages = [
        {author: "Alex", time: "3:45 PM", message: "Hey, how's it going?"},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
        {author: "Camilo", time: "3:45 PM", message: "Hey, hoasdag?", type: MessengerType.SENDER},
    ];

    return (
        <div className='flex h-screen w-full flex-col'>
            <div className='flex flex-1'>
                <UsersMenu className='flex w-64'/>
                <div className="flex flex-col">
                    <div className="sticky top-0 p-4 border-b bg-background">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src="/placeholder-user.jpg"/>
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="font-medium">John Doe</div>
                                <div className="text-sm text-muted-foreground">Online</div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MoveHorizontalIcon className="w-5 h-5"/>
                                <span className="sr-only">More options</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                        <div className="grid gap-4">
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">2:39 PM</div>
                                    </div>
                                    <div>
                                        <p>Hey there! How's it going?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">2:39 PM</div>
                                    </div>
                                    <div>
                                        <p>Hey there! How's it going?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">2:39 PM</div>
                                    </div>
                                    <div>
                                        <p>Hey there! How's it going?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">2:39 PM</div>
                                    </div>
                                    <div>
                                        <p>Hey there! How's it going?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">2:39 PM</div>
                                    </div>
                                    <div>
                                        <p>Hey there! How's it going?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">You</div>
                                        <div className="text-xs text-muted-foreground">2:40 PM</div>
                                    </div>
                                    <div>
                                        <p>Hi John, I'm doing great! How about you?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">You</div>
                                        <div className="text-xs text-muted-foreground">2:40 PM</div>
                                    </div>
                                    <div>
                                        <p>Hi John, I'm doing great! How about you?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">You</div>
                                        <div className="text-xs text-muted-foreground">2:40 PM</div>
                                    </div>
                                    <div>
                                        <p>Hi John, I'm doing great! How about you?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">You</div>
                                        <div className="text-xs text-muted-foreground">2:40 PM</div>
                                    </div>
                                    <div>
                                        <p>Hi John, I'm doing great! How about you?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">You</div>
                                        <div className="text-xs text-muted-foreground">2:40 PM</div>
                                    </div>
                                    <div>
                                        <p>Hi John, I'm doing great! How about you?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">You</div>
                                        <div className="text-xs text-muted-foreground">2:40 PM</div>
                                    </div>
                                    <div>
                                        <p>Hi John, I'm doing great! How about you?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">You</div>
                                        <div className="text-xs text-muted-foreground">2:40 PM</div>
                                    </div>
                                    <div>
                                        <p>Hi John, I'm doing great! How about you?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-user.jpg"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">2:41 PM</div>
                                    </div>
                                    <div>
                                        <p>Doing well, thanks for asking!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sticky bottom-0 p-4 bg-background border-t">
                        <div className="relative">
                            <Textarea
                                placeholder="Type your message..."
                                className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 border border-neutral-400 shadow-sm"
                            />
                            <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
                                <SendIcon className="w-4 h-4"/>
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
    );
}