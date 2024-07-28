"use client";
import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { UsersNav } from "@/components/nav/users-nav";
import { IFromServerMessage } from "@/interfaces/messages";
import { userRoomAtom } from "@/atoms/user-room.atom";
import { chatMessagesAtom } from "@/atoms/chat-messages.atom";
import { authUserAtom } from "@/atoms/auth-user.atom";
import { useSocket } from "@/providers/socket-context.provider";
import { SendIcon } from "lucide-react";
import { User } from "@/interfaces/online-users.interface";
import toast from "react-hot-toast";

const SenderMessage = ({ data }: { data: IFromServerMessage }) => (
  <div className="flex gap-3 justify-end">
    <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
      <p className="text-sm">{data.message}</p>
      <p>
        <span className="text-muted-foreground text-xs/[13px]">
          • {new Date(data.createdAt as Date).toLocaleTimeString()}
        </span>
      </p>
    </div>
    <Avatar className="w-8 h-8 border">
      <AvatarImage src="/placeholder-user.jpg" />
      <AvatarFallback>Yo</AvatarFallback>
    </Avatar>
  </div>
);

const ReceiverMessage = ({
  data,
  name,
}: {
  data: IFromServerMessage;
  name: string;
}) => (
  <div className="flex gap-3 justify-start">
    <Avatar className="w-8 h-8 border">
      <AvatarImage src="/placeholder-user.jpg" />
      <AvatarFallback>
        {data.metadata?.name?.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div className="bg-muted rounded-lg p-3 max-w-[75%]">
      <p className="text-primary font-bold text-xs">{data.metadata?.name}:</p>
      <p className="text-sm font-mono">{data.message}</p>
      <p>
        <span className="text-muted-foreground text-xs/[13px]">
          • {new Date(data.createdAt as Date).toLocaleTimeString()}
        </span>
      </p>
    </div>
  </div>
);

const ChatMessage = ({
  data,
  authUser,
  receiverName,
}: {
  authUser: User;
  data: IFromServerMessage;
  receiverName: string;
}) => {
  if (String(data.authorId) === String(authUser._id)) {
    return <SenderMessage data={data} />;
  }
  return <ReceiverMessage data={data} name={receiverName} />;
};

export default function ChatPage() {
  const socket = useSocket();
  const [roomUser, setRoomUser] = useRecoilState(userRoomAtom);
  const [messages, setMessages] = useRecoilState(chatMessagesAtom);
  const [authUser] = useRecoilState(authUserAtom);

  const messageContainer = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (socket?.message) {
      socket.emitMessage({
        author: authUser,
        receiver: roomUser,
        message: socket.message,
        createdAt: new Date(),
      });
      socket.setMessage("");
    }
  };

  useEffect(() => {
    toast("Hello World");
  }, []);

  return (
    <div className="max-w-8xl mx-auto">
      <UsersNav />
      <div className="lg:pl-[19.5rem] mt-16 min-h-full">
        <div className="sticky top-0 p-4 border-b bg-background z-50 h-16">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {roomUser.name?.substring(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">{roomUser.name}</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4  min-h-screen">
          <div ref={messageContainer} className="grid gap-2 pl-8 ">
            {messages?.map((value: IFromServerMessage, index: React.Key) => (
              <ChatMessage
                key={index}
                authUser={authUser}
                receiverName={
                  roomUser.name?.substring(0, 2)?.toUpperCase() as string
                }
                data={value}
              />
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 p-4 bg-background border-t">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 border border-neutral-400 shadow-sm"
              value={socket?.message || ""}
              onChange={(e) => socket?.setMessage(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute w-8 h-8 top-5 right-3"
              onClick={sendMessage}
            >
              <SendIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
