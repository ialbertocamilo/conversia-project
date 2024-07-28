import {atom} from "recoil";
import {User} from "@/interfaces/online-users.interface";

export const authUserAtom = atom<User>({
    key: 'authUserAtom',
    default: {_id:'',name:'',username:''}
})