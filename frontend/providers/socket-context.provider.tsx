"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { IOnlineUser, User } from "@/interfaces/online-users.interface";
import { IFromServerMessage, IMessage } from "@/interfaces/messages";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { authUserAtom } from "@/atoms/auth-user.atom";
import { chatMessagesAtom } from "@/atoms/chat-messages.atom";
import { useRouter } from "next/navigation";
import { userRoomAtom } from "@/atoms/user-room.atom";
import { socketEvents, STORAGE_VARIABLES } from "@/shared/constants";
import { storage } from "@/lib/storage";

export interface SocketContextType {
  socket: Socket | null;
  emitEnterRoom: (data: IOnlineUser) => void;
  emitMessage: (message: IMessage) => void;
  emitClose: () => Promise<void>;
  init: () => void;
  onlineUsers: IOnlineUser[];
  authUser: Partial<User>;
  setMessages: SetterOrUpdater<IFromServerMessage[]>;
  messages: IFromServerMessage[];
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUser[]>([]);
  const [messages, setMessages] = useRecoilState(chatMessagesAtom);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const [roomUser, setRoomUser] = useRecoilState(userRoomAtom);

  useEffect(() => {
    init();
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    emitEnterRoom(roomUser);
  }, [roomUser, socket]);

  const init = () => {
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";
    const newSocket = io(socketUrl, {
      extraHeaders: {
        authorization: storage(STORAGE_VARIABLES.token).get() || "",
      },
    });

    setSocket(newSocket);

    newSocket.on(socketEvents.usersList, (data: IOnlineUser[]) =>
      setOnlineUsers(data),
    );
    newSocket.on("connect", () => console.log("Conectado a websocket"));
    newSocket.on(socketEvents.getAllMessages, (data: IFromServerMessage[]) =>
      setMessages(data),
    );
    newSocket.on(socketEvents.message, (data: IFromServerMessage) =>
      pushMessage(data),
    );
    newSocket.on("disconnect", () => console.log("Desconectado de websocket"));
  };

  const emitMessage = (message: IMessage) => {
    socket?.emit("message", message);
  };

  const pushMessage = (message: IFromServerMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const emitClose = async () => {
    setAuthUser({
      _id: "",
      createdAt: "",
      name: undefined,
      username: undefined,
    });
    storage(STORAGE_VARIABLES.token).set(null);
    router.push("/");
    socket?.disconnect();
  };

  const emitEnterRoom = (data: IOnlineUser) => {
    socket?.emit(socketEvents.joinRoom, data);
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
        message,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType | null => {
  const context = useContext(SocketContext);
  if (!context) {
    console.error("useSocket must be used within a SocketProvider");
    return null;
  }
  return context;
};
