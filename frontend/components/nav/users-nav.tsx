"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IOnlineUser } from "@/interfaces/online-users.interface";
import { useRecoilState } from "recoil";
import { userRoomAtom } from "@/atoms/user-room.atom";
import { useSocket } from "@/providers/socket-context.provider";
import { useEffect, useState } from "react";
import { authUserAtom } from "@/atoms/auth-user.atom";
import {Rooms} from "@/shared/constants";

function Item({
  user,
  message,
  select,
}: {
  user?: IOnlineUser;
  message?: string;
  select: Function;
}) {
  const selectItem = () => {
    select();
  };
  return (
    <>
      <div
        className="flex items-center gap-4 m-2 cursor-pointer hover:animate-pulse hover:scale-105"

      >
        <Avatar className="w-8 h-8 border-green-500 border-2">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>
            {user?.name?.substring(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1 text-sm">
          <div className=" items-center gap-2">
            <div className="font-medium">{user?.name}</div>
          </div>
          <div>
            <p className="line-clamp-2">{message}</p>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export function UsersNav() {
  const [user, setUser] = useRecoilState(userRoomAtom);

  const [items, setItems] = useState<IOnlineUser[]>();
  const socket = useSocket();
  const [authUser] = useRecoilState(authUserAtom);
  const selectUser = (user: IOnlineUser) => {
    setUser(user);
    socket?.emitEnterRoom(user);
  };
  useEffect(() => {
    setItems(
      socket?.onlineUsers.filter(
        (value) => String(value?._id) !== String(authUser._id),
      ),
    );
  }, [socket?.onlineUsers]);

  const selectRoom = () => {
    setUser(Rooms.public);
  };
  return (
    <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19rem] pb-10 pl-8 overflow-y-auto">
      <nav
        id="nav"
        className="lg:text-sm lg:leading-6 relative bg:primary p-3 "
      >
        <div className="sticky top-0 -ml-0.5 dark:bg-background bg-white p-2 z-50 ">
          <div className="sticky top-0 p-4 z-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Users</h2>
              <Button variant="ghost" size="icon">
                <PlusIcon className="w-5 h-5" />
                <span className="sr-only">Add user</span>
              </Button>
            </div>
          </div>
          <hr />
          <div className=" w-full  relative pointer-events-auto my-1">
            <Button
              size="sm"
              className="bg-background  w-full  text-primary hover:bg-background hover:text-primary-foreground"
            >
              <SearchIcon />
              Quick search...
              <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                Ctrl K
              </span>
            </Button>
          </div>
          <div className=" w-full  relative pointer-events-auto my-1">
            <Button
              size="sm"
              onClick={selectRoom}
              className=" bg-background w-full text-primary hover:bg-background hover:text-primary-foreground"
            >
              Sala principal
            </Button>
          </div>
        </div>
        <ul>
          {items?.map((value, index) => (
            <Item key={index} user={value} select={() => selectUser(value)} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
