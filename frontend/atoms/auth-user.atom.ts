import {atom} from "recoil";
import {User} from "@/interfaces/online-users.interface";

export const authUserAtom = atom<Partial<User>>({
    key: 'authUserAtom',
    default: {}
})