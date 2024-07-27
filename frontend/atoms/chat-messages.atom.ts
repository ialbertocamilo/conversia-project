import {atom} from "recoil";
import {IChatMessage} from "@/interfaces/messages";


export const chatMessagesAtom=atom<IChatMessage[]>({
    key:'chatMessagesAtom',
    default:[]
})