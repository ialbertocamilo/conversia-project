'use client'
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Textarea} from "@/components/ui/textarea"
import {UsersNav} from "@/components/nav/users-nav";
import {useSocket} from "@/hooks/useSocket";
import {IMessage, MessengerType} from "@/interfaces/messages";
import React, {useEffect} from "react";

const SenderMessage = ({data}: { data: IMessage }) => {
    return (<div className="flex gap-3 justify-end">
            <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">You</span>
                </div>
                <p className="text-sm">{data.message}</p>
                <p>
                    <span className="text-muted-foreground text-xs/[13px] ">• {data.time.toLocaleTimeString()}</span>
                </p>
            </div>
            <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg"/>
                <AvatarFallback>Yo</AvatarFallback>
            </Avatar>
        </div>);
};

const ReceiverMessage = ({data}: { data: IMessage }) => {
    return (<div className="flex gap-3 justify-start">
            <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg"/>
                <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg p-3 max-w-[75%]">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{data.receiver}</span>
                </div>
                <p className="text-sm">{data.message}</p>
                <p>
                    <span className="text-muted-foreground text-xs/[13px] ">• {data.time.toLocaleTimeString()}</span>
                </p>
            </div>
        </div>);
};

const ChatMessage = ({data}: { data: IMessage }) => {
    if (data.type === MessengerType.SENDER) {
        return <SenderMessage data={data}/>;
    }
    return <ReceiverMessage data={data}/>;
};

export default function ChatPage() {

    const {socket, setMessages, messages, message, emitMessage, setMessage} = useSocket()


    useEffect(() => {

        setMessages([{sender: "Alex", receiver: '', time: new Date(), message: "Hey, how's it going?"}, {
            sender: "Camilo",
            receiver: '',
            time: new Date(),
            message: "Hey, hoasdag? loremasdadasdasdadadasd adasd asdsadas das asd asdadasdadsa as as    ",
            type: MessengerType.SENDER
        }, {
            sender: "Camilo",
            receiver: '',
            time: new Date(),
            message: "Hey, hoasdag?",
            type: MessengerType.SENDER
        }, {sender: "Camilo", receiver: '', time: new Date(), message: "Hey, hoasdag?", type: MessengerType.SENDER}])
    }, []);

    function sendMessage() {
        if (message) emitMessage({
            message,
            type: MessengerType.SENDER,
            time: new Date(),
            sender: 'Camilo',
            receiver: 'Alex'
        })
        setMessage('')
    }

    return (

        <div className="max-w-8xl mx-auto">
            <UsersNav/>
            <div className="lg:pl-[19.5rem] mt-16">
                <div className="sticky top-0 p-4 border-b bg-background z-50 h-16">
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
                        {messages.map((value, index) => <ChatMessage key={index} data={value}/>)}
                    </div>
                </div>
                <div className="sticky bottom-0 p-4 bg-background border-t">
                    <div className="relative">
                        <Textarea
                            placeholder="Type your message..."
                            className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 border border-neutral-400 shadow-sm"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3"
                                onClick={() => sendMessage()}>
                            <ArrowUpIcon className="w-4 h-4"/>
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>)
}

function ArrowUpIcon(props) {
    return (<svg
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
            <path d="m5 12 7-7 7 7"/>
            <path d="M12 19V5"/>
        </svg>)
}


function MoveHorizontalIcon(props) {
    return (<svg
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
            <polyline points="18 8 22 12 18 16"/>
            <polyline points="6 8 2 12 6 16"/>
            <line x1="2" x2="22" y1="12" y2="12"/>
        </svg>)
}

