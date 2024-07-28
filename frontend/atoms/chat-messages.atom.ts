import { atom } from "recoil";
import {IFromServerMessage, IMessage} from "@/interfaces/messages";

export const chatMessagesAtom = atom<IFromServerMessage[]>({
  key: "chatMessagesAtom",
  default: [],
});
