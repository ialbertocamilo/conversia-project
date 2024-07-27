import { ObjectId } from 'mongoose';

export enum RoomEnum {
  principal = 'principal',
  another = 'another_room',
}

export enum MessengerType {
  SENDER,
  RECEIVER,
}

export interface IMessage {
  userId?: string;
  receiverId: string | RoomEnum; //UserId or room constants
  message: string;
  createdAt?: Date;
  deletedAt?: Date;
  type?: MessengerType;
  _id?: ObjectId;
}
