import { atom } from "recoil";
import { User } from "@/interfaces/online-users.interface";
import { Rooms } from "@/shared/constants";

export const userRoomAtom = atom<User>({
  key: "userRoomAtom",
  default: Rooms.principal,
});
