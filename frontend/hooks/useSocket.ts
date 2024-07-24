'use client'
import {useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {IMessage} from "@/interfaces/messages";
import {useStorage} from "@/hooks/useStorage";
import {STORAGE_VARIABLES} from "@/shared/constants";

export function useSocket() {

    const [socket, setSocket] = useState<Socket | null>(null);


    const [message, setMessage] = useState('')

    const storage = useStorage(STORAGE_VARIABLES.token)
    const [messages, setMessages] = useState<IMessage[]>([])
    useEffect(() => {

        const url = process.env.NEXT_PUBLIC_SOCKET_URL as string
        const socket = io(url, {
            extraHeaders: {
                authorization: storage.get()
            }
        });
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Conectado a websocket');
        });

        socket.on('disconnect', () => {
            console.log('Desconectado de websocket');
        });

    }, []);


    const emitMessage = (message: IMessage) => {
        console.log("Sending message")
        console.log(message)
        socket?.emit('message', message)
        setMessage(message.message)
        setMessages([...messages, message])
    }
    return {emitMessage, socket, message, setMessage, messages, setMessages}
}