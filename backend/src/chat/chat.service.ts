import { Inject, Injectable, Logger } from '@nestjs/common';
import { GenericService } from '../shared/generic-service';
import { ChatMessage, ChatMessageDocument } from './schema/messages-schema';
import { IGenericRepository } from '../shared/generic-mongo-repository.service';
import { ChatMessageMongoRepository } from './chat-message-mongo.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import {
  messengerType,
  redisConstants,
  socketEvents,
} from '../common/constants';
import { IOnlineUser } from './interfaces/online-users.interface';
import {
  extractSocketCodeFromKeys,
  filterSocketUserInfo,
  removeUsersBySocketCode,
} from '../common/utils';
import { User } from '../user/schema/user-schema';
import {
  IMessage,
  MessengerType,
  RoomEnum,
} from './interfaces/message.interface';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService extends GenericService<ChatMessage> {
  private readonly logger = new Logger();

  constructor(
    @Inject(ChatMessageMongoRepository)
    protected readonly repository: IGenericRepository<ChatMessageDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
  ) {
    super(repository);
  }

  async addOnlineUser(user: User, clientId: string): Promise<IOnlineUser[]> {
    const onlineUser = { user: user, socket_code: clientId };
    const users = (await this.cacheManager.store.get(
      redisConstants.USER_LIST,
    )) as Array<IOnlineUser>;
    const updatedUsers =
      users?.length > 0 ? [...users, onlineUser] : [onlineUser];
    await this.cacheManager.store.set(redisConstants.USER_LIST, updatedUsers);
    return updatedUsers;
  }

  async removeSocketFromOnlineList(socketCodes: string[]) {
    let onlineUsers = (await this.cacheManager.store.get(
      redisConstants.USER_LIST,
    )) as Array<IOnlineUser>;
    if (socketCodes?.length == 0) {
      await this.cacheManager.store.del(redisConstants.USER_LIST);
      return [];
    }
    onlineUsers = removeUsersBySocketCode(socketCodes, onlineUsers);
    await this.cacheManager.store.set(redisConstants.USER_LIST, onlineUsers);
    return onlineUsers;
  }

  async getOnlineUsers() {
    return await this.cacheManager.store.get(redisConstants.USER_LIST);
  }

  async getAllMessagesByUserAndReceiver(userId: string, receiverId: string) {
    const messages = await this.repository.findAll({
      $or: [
        { userId: userId, receiverId: receiverId },
        { userId: receiverId, receiverId: userId },
      ],
    });
    console.log('message');
    console.log(messages);
    return messages.map((value) => {
      if (value.userId === userId)
        return { ...value.toJSON(), type: messengerType.SENDER };
      else if (value.userId === receiverId)
        return { ...value.toJSON(), type: messengerType.RECEIVER };
    });
  }

  async getInfoFromOnlineUsers(userId: string) {
    const onlineUsers = (await this.cacheManager.store.get(
      redisConstants.USER_LIST,
    )) as Array<IOnlineUser>;
    return filterSocketUserInfo(userId, onlineUsers);
  }

  async messageToRoom(chatMessage: IMessage, connectedUsers: Socket[]) {
    if (chatMessage.receiverId === RoomEnum.principal) {
      console.log('Message to room');
      const usersInRoom = await this.cacheManager.store.keys(
        `${RoomEnum.principal}*`,
      );
      const result = extractSocketCodeFromKeys(usersInRoom);
      result.forEach((value) => {
        if (connectedUsers[value])
          connectedUsers[value].emit(socketEvents.message, chatMessage);
      });
    }
  }

  async messageToUser(
    chatMessage: IMessage,
    connectedUsers: Socket[],
    authUser: User,
  ) {
    const onlineUsers = await this.getInfoFromOnlineUsers(
      chatMessage.receiverId,
    );
    onlineUsers.forEach((value) =>
      connectedUsers[value.socket_code]?.emit(socketEvents.message, {
        ...chatMessage,
        type: MessengerType.RECEIVER,
      }),
    );
  }

  async enterRoom(roomId: string, clientSocket: string, user: User) {
    if (roomId === RoomEnum.principal) {
      this.logger.log('Entering to room : ', roomId);
      const key = roomId + '_' + clientSocket;
      await this.cacheManager.store.set(key, user);

      return await this.repository.findAll({ receiverId: roomId });
    }
    return null;
  }
}
