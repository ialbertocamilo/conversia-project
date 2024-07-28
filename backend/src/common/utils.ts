import * as bcrypt from 'bcrypt';
import { messengerType, SALT } from './constants';
import { IMessage, IOnlineNode } from '../chat/interfaces/chat.interface';

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
  socketCodeToRemove: string,
  onlineUsers: IOnlineNode[],
): IOnlineNode[] {
  return onlineUsers?.filter((user) => user.socketId !== socketCodeToRemove);
}

export function filterSocketUserInfo(userId: string, array: IOnlineNode[]) {
  return array?.filter((value) => value.user._id == userId);
}

export function filterUserMessagesByRoom(
  messages: IMessage[],
  authUserId: string,
) {
  return messages?.map((value) => {
    if (String(value.author) === authUserId) {
      return { ...value, type: messengerType.SENDER };
    }
    return { ...value, type: messengerType.RECEIVER };
  });
}
