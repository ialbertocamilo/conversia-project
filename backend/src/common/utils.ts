import * as bcrypt from 'bcrypt';
import {SALT} from './constants';
import {IOnlineUser} from "../chat/interfaces/online-users.interface";
import {User} from "../user/schema/user-schema";
import {RoomEnum} from "../chat/interfaces/message.interface";

export async function encrypt(value: string) {
    return await bcrypt.hash(value, SALT);
}

export async function decrypt(value: string, encryptedHash: string) {
    return await bcrypt.compare(value, encryptedHash);
}


export function extractBearerToken(authorization: string): string | undefined {
    if (!authorization) {
        return undefined;
    }
    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return undefined;
    }
    return parts[1];
}


export function removeUsersBySocketCode(
  socketCodesToRemove: string[],
  onlineUsers: IOnlineUser[],
): IOnlineUser[] {
  const codesToRemoveSet = new Set(socketCodesToRemove);
  return onlineUsers?.filter(user => codesToRemoveSet.has(user.socket_code));
}

export function filterSocketUserInfo(userId:string,array:IOnlineUser[]){
    return array.filter(value => value.user._id==userId)
}
export function isRoom(roomId:RoomEnum) {

    switch (roomId){
        case RoomEnum.another:
        case RoomEnum.principal:
            return true
        default:
            return false
    }
}

export function extractSocketCodeFromKeys(list:string[]){

    return  list.map((value:string) => value.split('_')[1])
}

export function getRoomNameFromKey(key:string){
    return key.split('_')[0]
}

export function getRoomUsers(roomName:string,onlineUsers:IOnlineUser[]){
    return onlineUsers.filter(value => value.user._id==roomName)
}

export function getRoomUsersBySocket(roomName:string,onlineUsers:IOnlineUser[]){
    return onlineUsers.filter(value => value.socket_code==roomName)
}
