import * as bcrypt from 'bcrypt';
import {SALT} from './constants';
import {IOnlineUser} from "../chat/interfaces/online-users.interface";
import {User} from "../user/schema/user-schema";

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


export function removeOnlineUserFromArray(value: IOnlineUser, array: IOnlineUser[]): IOnlineUser[] {
    return array?.filter(item => String(item.user?._id) !== String(value.user?._id));
}
export function removeSocketFromArray(value: IOnlineUser, array: IOnlineUser[]): IOnlineUser[] {
    return array?.filter(item => String(item.user?._id) !== String(value.user?._id));
}

export function hideProperties<T>(obj: T, propertiesToHide: string[]) {
  return Object.keys(obj)
    .filter(key => !propertiesToHide.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as T);
}

export function getUsersExceptMe(user:User,onlineUsers:IOnlineUser[]){
    return onlineUsers.filter(item => String(item.user?._id) !== String(user._id))
}