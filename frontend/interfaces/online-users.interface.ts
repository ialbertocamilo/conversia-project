import { ERoom } from "@/interfaces/messages";

export class User {
  _id?: string;

  name: string | undefined;

  username: string | undefined;

  createdAt?: string;

  constructor(params: unknown) {
    Object.assign(this, params);
  }
}

export interface IOnlineUser {
  _id?: string;
  name: string;
  username: string;
  roomType: ERoom;
}

export interface IRoom extends IOnlineUser {
  roomType: ERoom;
}
