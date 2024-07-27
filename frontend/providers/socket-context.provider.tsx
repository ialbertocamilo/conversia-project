'use client'

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {useStorage} from '@/hooks/useStorage';
import {socketEvents, STORAGE_VARIABLES} from '@/shared/constants';
import {IOnlineUser, User} from '@/interfaces/online-users.interface';
import {IChatMessage, IMessage, MessengerType} from '@/interfaces/messages';
import {SetterOrUpdater, useRecoilState} from 'recoil';
import {authUserAtom} from '@/atoms/auth-user.atom';
import {chatMessagesAtom} from '@/atoms/chat-messages.atom';
import {useRouter} from "next/navigation";

export interface SocketContextType {
    socket: Socket | null;
    emitEnterRoom: (data: User) => void | undefined;
    emitMessage: (message: IChatMessage) => void;
    emitClose: () => Promise<void>;
    init: () => void;
    onlineUsers: IOnlineUser[];
    authUser: Partial<User>;
    setMessages: SetterOrUpdater<IChatMessage[]>;
    messages: IChatMessage[];
    setMessage: any;
    message: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const storage = useStorage(STORAGE_VARIABLES.token);
    const [authUser, setAuthUser] = useRecoilState(authUserAtom);
    const [onlineUsers, setOnlineUsers] = useState<IOnlineUser[]>([]);
    const [messages, setMessages] = useRecoilState<IChatMessage[]>(chatMessagesAtom);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000';
        const newSocket = io(socketUrl, {
            extraHeaders: {
                authorization: storage.get() || '',
            },
        });

        setSocket(newSocket);

        newSocket.on(socketEvents.usersList, (data: IOnlineUser[]) => {
            setOnlineUsers(data);
        });

        newSocket.on('connect', () => {
            console.log('Conectado a websocket');
        });

        newSocket.on(socketEvents.getAllMessages, (data: IChatMessage[]) => {
            console.log(data)
            setMessages(data);
        });

        newSocket.on(socketEvents.message, (data: IChatMessage) => {
            pushMessage(data);
        });

        newSocket.on('disconnect', () => {
            console.log('Desconectado de websocket');
        });
    };

    const emitEnterRoom = (data: User) => {
        socket?.emit(socketEvents.enterRoom, data);
    };

    const emitMessage = (message: IMessage) => {
        console.log("Emit message");
        socket?.emit('message', message);
        setMessage(message.message);
        setMessages(prevMessage => {
            const msg = {
                message: message.message,
                createdAt: new Date(),
                type: MessengerType.SENDER,
                receiverId: message.receiverId
            }
            if (prevMessage?.length == 0 || !prevMessage) return [msg]
            return [...prevMessage, msg]
        });
    };

    const pushMessage = (message: IChatMessage) => {
        setMessages(prevMessages => [...prevMessages, {
            message: message.message,
            createdAt: message.createdAt,
            type: message.type,
            receiverId: message.receiverId
        }]);
    };

    const emitClose = async () => {
        setAuthUser({});
        storage.set(null);
        router.push('/');
        socket?.disconnect();
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                emitEnterRoom,
                emitMessage,
                emitClose,
                init,
                onlineUsers,
                authUser,
                setMessages,
                messages,
                setMessage,
                message
            }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): SocketContextType | null => {
    const context = useContext(SocketContext);
    if (!context) {
        console.error('useSocket must be used within a SocketProvider');
        return null;
    }
    if (!context?.socket) {
        console.error('Socket is not initialized');
        return null;
    }
    return context;
};
