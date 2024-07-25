'use client'
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Textarea} from "@/components/ui/textarea"
import {UsersNav} from "@/components/nav/users-nav";
import {useSocket} from "@/hooks/useSocket";
import {IMessage, MessengerType} from "@/interfaces/messages";
import React from "react";
import {useRecoilState} from "recoil";
import {userRoomAtom} from "@/atoms/user-room.atom";
import {SendIcon} from "lucide-react";

const SenderMessage = ({data}: { data: IMessage }) => {
    return (<div className="flex gap-3 justify-end">
        <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
            <p className="text-sm">{data.message}</p>
            <p>
                <span className="text-muted-foreground text-xs/[13px] ">• {new Date(data?.createdAt).toLocaleTimeString()}</span>
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
                <span className="font-medium">{JSON.stringify(data)}</span>
            </div>
            <p className="text-sm">{data.message}</p>
            <p>
                <span className="text-muted-foreground text-xs/[13px] ">• {data.createdAt.toLocaleTimeString()}</span>
            </p>
        </div>
    </div>);
};

const ChatMessage = ({data,type}: { data: IMessage,type:MessengerType }) => {
    if (type === MessengerType.SENDER) {
        return <SenderMessage data={data}/>;
    }
    return <ReceiverMessage data={data}/>;
};

export default function ChatPage() {

    const {onlineUsers, setMessages, messages, message, emitMessage, setMessage} = useSocket()
    const [user, setUser] = useRecoilState(userRoomAtom)


    function sendMessage() {
        if (message) emitMessage({
            receiverId: user._id as string,
            message,
            type: MessengerType.SENDER,
            createdAt: new Date(),
        })
        setMessage('')
    }

    return (

        <div className="max-w-8xl mx-auto">
            <UsersNav items={onlineUsers}/>
            <div className="lg:pl-[19.5rem] mt-16">
                <div className="sticky top-0 p-4 border-b bg-background z-50 h-16">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="/placeholder-user.jpg"/>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">Online </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4 h-screen overflow-hidden">
                    <div className="grid gap-4">
                        {messages?.receiverMessage?.map((value, index) => <ChatMessage type={MessengerType.RECEIVER} key={index} data={value}/>)}
                        {messages?.senderMessage?.map((value, index) => <ChatMessage type={MessengerType.SENDER} key={index} data={value}/>)}
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
                        <Button type="submit" size="icon" className="absolute w-8 h-8 top-5 right-3"
                                onClick={() => sendMessage()}>
                            <SendIcon className="w-4 h-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>)
}

function ArrowUpIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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


