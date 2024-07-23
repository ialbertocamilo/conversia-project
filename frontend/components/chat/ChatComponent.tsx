import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

const MESSAGE_STATUSES = {
    SENDER: "sender",
    RECEIVER: "receiver",
};

const ChatMessage = ({message, status}) => (
    <div
        className={`flex items-start gap-3 ${
            status === MESSAGE_STATUSES.SENDER ? "justify-end" : ""
        }`}
    >
        {status === MESSAGE_STATUSES.RECEIVER && (
            <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg"/>
                <AvatarFallback>AC</AvatarFallback>
            </Avatar>
        )}
        <div className="grid gap-1  rounded-lg bg-muted p-4 text-sm">
            <div
                className={` bg-<span class="math-inline">\{
status \=\=\= MESSAGE\_STATUSES\.SENDER ? "primary" \: "muted"
\} rounded\-lg p\-3 max\-w\-\[75%\] text\-</span>{
          status === MESSAGE_STATUSES.SENDER ? "primary-foreground" : "muted-foreground"
        }`}
            >
                <div className="flex items-center gap-2 text-sm ">
                    <span className="font-medium ">{message.sender}</span>
                    <span
                        className={`text-${status === MESSAGE_STATUSES.SENDER ? "primary-foreground " : "muted-foreground/80"}`}>
            {message.time}
          </span>
                </div>
                <p className="text-sm ">{message.text}</p>
            </div>
        </div>
        {status === MESSAGE_STATUSES.SENDER && (
            <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg"/>
                <AvatarFallback>YO</AvatarFallback>
            </Avatar>
        )}
    </div>
);
export default function ChatComponent() {
    const messages = [
        // Your message data here
        {sender: "Alex", time: "3:45 PM", text: "Hey, how's it going?"},
    ];

    return (
        <>
            <div className="flex-1 mt-20 overflow-auto">

                <div className="grid gap-4 ">
                    <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 border">
                            <AvatarImage src="/placeholder-user.jpg"/>
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <div className="bg-muted rounded-lg p-3 max-w-[75%]">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">Alex</span>
                                    <span className="text-muted-foreground">3:45 PM</span>
                                </div>
                                <p className="text-sm">Hey, how's it going?</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                    <div className="grid gap-1">
                        <div className="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">You</span>
                                <span className="text-primary-foreground/80">3:46 PM</span>
                            </div>
                            <p className="text-sm">I'm doing great, thanks for asking!</p>
                        </div>
                    </div>
                    <Avatar className="w-8 h-8 border">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>Yo</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="bg-card p-4 shadow">
                <div className="relative">
                    <Textarea
                        placeholder="Type your message..."
                        name="message"
                        id="message"
                        rows={1}
                        className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
                    />
                    <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3 disabled">
                        <SendIcon className="w-4 h-4"/>
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </div>
        </>
    );
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
