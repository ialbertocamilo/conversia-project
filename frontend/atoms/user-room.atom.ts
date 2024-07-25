import {atom} from "recoil";
import {User} from "@/interfaces/online-users.interface";


export const userRoomAtom = atom<User>({
    key: 'userRoomAtom',
    default: {username: '', _id: '', name: '', key: '', createdAt: ''}
})