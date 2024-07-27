export const STORAGE_VARIABLES = {
  token: "access_token",
};

export enum RoomEnum {
  principal = "principal",
}

export const Rooms = {
  principal: {
    username: RoomEnum.principal,
    name: "Sala principal",
    _id: RoomEnum.principal,
    key: RoomEnum.principal,
  },
};

export const socketEvents = {
  message: "message",
  usersList: "users_list",
  enterRoom: "enter_room",
  leaveRoom: "leave_room",
  getAllMessages: "get_all_messages",
};
