import {User} from "../../user/schema/user-schema";


export interface IOnlineUser {
    user?:User;
    socket_code:string
}