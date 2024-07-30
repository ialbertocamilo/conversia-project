import { ERoom } from "@/interfaces/messages";

export const STORAGE_VARIABLES = {
  token: "access_token",
};

export const Rooms = {
  public: {
    username: "public-room",
    name: "Sala principal",
    _id: "public-room",
    roomType: ERoom.public,
  },
  private: {
    username: "private-room",
    name: "Sala privada",
    _id: "private-room",
    roomType: ERoom.private,
  },
};

export const socketEvents = {
  message: "message",
  usersList: "users_list",
  enterRoom: "enter_room",
  leaveRoom: "leave_room",
  getAllMessages: "get_all_messages",
  joinRoom: "join_room",
};

export const eventErrors = {
  tokenExpiredError:'TokenExpiredError'
};
