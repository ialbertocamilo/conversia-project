'use client'
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Textarea} from "@/components/ui/textarea"
import {UsersNav} from "@/components/nav/users-nav";
import {IChatMessage, IMessage, MessengerType} from "@/interfaces/messages";
import React, {useEffect} from "react";
import {useRecoilState} from "recoil";
import {userRoomAtom} from "@/atoms/user-room.atom";
import {SendIcon} from "lucide-react";
import {useSocket} from "@/providers/socket-context.provider";
import {chatMessagesAtom} from "@/atoms/chat-messages.atom";

const SenderMessage = ({data}: { data: IMessage }) => {
    return (<div className="flex gap-3 justify-end">
        <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
            <p className="text-sm">{data.message}</p>
            <p>
                <span
                    className="text-muted-foreground text-xs/[13px] ">• {new Date(data.createdAt as Date).toLocaleTimeString()}</span>
            </p>
        </div>
        <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg"/>
            <AvatarFallback>Yo</AvatarFallback>
        </Avatar>
    </div>);
};

const ReceiverMessage = ({data, name}: { data: IMessage, name: string }) => {
    return (<div className="flex gap-3 justify-start">
        <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg"/>
            <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="text-sm">{data.message}</p>
            <p>
                <span
                    className="text-muted-foreground text-xs/[13px] ">• {new Date(data.createdAt as Date).toLocaleTimeString()}</span>
            </p>
        </div>
    </div>);
};

const ChatMessage = ({data, type, receiverName}: { data: IMessage, type: string, receiverName: string }) => {
    if (type === MessengerType.SENDER) {
        return <SenderMessage data={data}/>;
    }
    return <ReceiverMessage data={data} name={receiverName}/>;
};

export default function ChatPage() {

    const socket = useSocket()
    const [roomUser, setRoomUser] = useRecoilState(userRoomAtom)
    const [messages, setMessages] = useRecoilState(chatMessagesAtom);

    useEffect(() => {
        setRoomUser({name: 'Sala principal', username: 'principal',_id:'principal'})
    }, []);

    function sendMessage() {
        if (socket?.message) socket?.emitMessage({
            receiverId: roomUser._id as string,
            message: socket?.message,
            type: MessengerType.SENDER,
            createdAt: new Date(),
        })
        socket?.setMessage('')
    }

    return (

        <div className="max-w-8xl mx-auto">
            <UsersNav/>
            <div className="lg:pl-[19.5rem] mt-16">
                <div className="sticky top-0 p-4 border-b bg-background z-50 h-16">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="/placeholder-user.jpg"/>
                            <AvatarFallback>{roomUser.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="font-medium">{roomUser.name}</div>
                            <div className="text-sm text-muted-foreground">Online</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    <div className="grid gap-2">
                        {messages?.map((value: IChatMessage, index: React.Key | null | undefined) =>
                            <ChatMessage type={value.type as string}
                                         receiverName={roomUser.name?.substring(0, 2)?.toUpperCase() as string}
                                         key={index} data={value}/>)}
                    </div>
                </div>
                <div className="sticky bottom-0 p-4 bg-background border-t">
                    <div className="relative">
                        <Textarea
                            placeholder="Type your message..."
                            className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 border border-neutral-400 shadow-sm"
                            value={socket?.message}
                            onChange={(e) => socket?.setMessage(e.target.value)}
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



