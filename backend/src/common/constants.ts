import { randomBytes } from 'crypto';

export const SALT = 8;

export const jwtConstants = {
  secret: 'secretKey',
};

export const redisConstants = {
  CONNECTED_NODES: 'connected_nodes',
  ONLINE_USERS: 'online_users',
};

export const providerNames = {
  genericService: Symbol.for('genericService'),
  genericRepository: Symbol.for('genericRepository'),
};

export const socketEvents = {
  message: 'message',
  usersList: 'users_list',
  joinRoom: 'join_room',
  leaveRoom: 'leave_room',
  getAllMessages: 'get_all_messages',
  notifyError: 'notify_error',
  notifySuccess: 'notify_success',
};

export const messengerType = {
  RECEIVER: 'receiver',
  SENDER: 'sender',
};

export const eventErrors = {
  tokenExpiredError: 'TokenExpiredError',
};
