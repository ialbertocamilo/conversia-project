import { atom } from "recoil";
import {IOnlineUser, IRoom, User} from "@/interfaces/online-users.interface";
import { Rooms } from "@/shared/constants";

export const userRoomAtom = atom<IRoom|IOnlineUser>({
  key: "userRoomAtom",
  default: Rooms.public,
});
