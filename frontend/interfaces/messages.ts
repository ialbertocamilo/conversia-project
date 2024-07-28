import { IOnlineUser, User } from "@/interfaces/online-users.interface";

export enum ERoom {
  private,
  public,
}

export interface IMessage {
  author: User;
  receiver?: IOnlineUser; //UserId or room constants
  message: string;
  createdAt?: Date;
  _id?: string;
}

export interface IFromServerMessage {
  _id: string;
  authorId: string;
  receiverId: string;
  roomType: number;
  message: string;
  metadata?: Record<string, any>;
  createdAt?: Date | string;
}
