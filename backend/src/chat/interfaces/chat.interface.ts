import { ObjectId } from 'mongoose';
import { User } from '../../user/schema/user-schema';

export enum EMessenger {
  SENDER,
  RECEIVER,
}

export enum ERoom {
  private,
  public,
}

export interface IOnlineNode {
  user?: Partial<User>;
  socketId: string;
}

export interface IOnlineUser {
  _id: string;
  name: string;
  username: string;
  roomType?: ERoom;
}

export interface IMessage {
  author: IOnlineUser;
  receiver: IOnlineUser; //UserId or room constants
  message: string;
  createdAt?: Date;
  _id?: ObjectId;
}
