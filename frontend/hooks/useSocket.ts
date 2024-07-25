'use client'
import {useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {useStorage} from "@/hooks/useStorage";
import {socketEvents, STORAGE_VARIABLES} from "@/shared/constants";
import {IOnlineUser, User} from "@/interfaces/online-users.interface";
import {IMessage, MessengerType} from "@/interfaces/messages";
import {useRecoilState} from "recoil";
import {chatMessagesAtom} from "@/atoms/chat-messages.atom";

export function useSocket() {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState<IOnlineUser[]>()
    const storage = useStorage(STORAGE_VARIABLES.token)

    const [messages, setMessages] = useRecoilState(chatMessagesAtom)
    useEffect(() => {

        const url = process.env.NEXT_PUBLIC_SOCKET_URL as string
        const socket = io(url, {
            extraHeaders: {
                authorization: storage.get()
            }
        });
        setSocket(socket);

        socket.on(socketEvents.usersList, (data: IOnlineUser[]) => {
            setOnlineUsers(data)
        })

        socket.on('connect', () => {
            console.log('Conectado a websocket');
        });

        socket.on(socketEvents.getAllMessages, (data) => {
            setMessages(data)
        })
        socket.on('disconnect', () => {
            console.log('Desconectado de websocket');
        });

    }, []);

    const emitEnterRoom = (data: User) => {
        socket?.emit(socketEvents.enterRoom, data)
    }

    const emitMessage = (message: IMessage) => {
        socket?.emit('message', message)
        setMessage(message.message)
        const newMessages = [...messages.senderMessage]
        newMessages.push({
            message: message.message,
            createdAt: new Date(),
            type: MessengerType.SENDER,
            receiverId: message.receiverId,
            userId: ''
        })
        console.log(newMessages)
        setMessages({receiverMessage: messages.receiverMessage, senderMessage: newMessages})
    }

    const emitClose = () => {
        socket?.disconnect()
    }
    return {
        emitClose,
        emitMessage,
        socket,
        message,
        setMessage,
        messages,
        setMessages,
        setOnlineUsers,
        onlineUsers,
        emitEnterRoom
    }
}