import { Inject, Injectable, Logger } from '@nestjs/common';
import { ChatMessage, ChatMessageDocument } from './schema/messages-schema';
import { IGenericRepository } from '../shared/generic-mongo-repository.service';
import { ChatMessageMongoRepository } from './chat-message-mongo.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import { redisConstants, socketEvents } from '../common/constants';
import { filterSocketUserInfo, removeUsersBySocketCode } from '../common/utils';
import { User } from '../user/schema/user-schema';
import { ERoom, IOnlineNode, IOnlineUser } from './interfaces/chat.interface';
import { Socket } from 'socket.io';
import { UserMongoRepository } from '../user/user-mongo.repository';
import { GenericService } from '../shared/service/generic-service';

@Injectable()
export class ChatService extends GenericService<ChatMessage> {
  private readonly logger = new Logger();

  constructor(
    @Inject(ChatMessageMongoRepository)
    protected readonly repository: IGenericRepository<ChatMessageDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    @Inject(UserMongoRepository)
    protected readonly userRepository: IGenericRepository<User>,
  ) {
    super(repository);
  }

  async addUserNode(onlineUser: IOnlineNode): Promise<IOnlineNode[]> {
    const users = (await this.cacheManager.store.get(
      redisConstants.CONNECTED_NODES,
    )) as Array<IOnlineNode>;
    const updatedUsers =
      users?.length > 0 ? [...users, onlineUser] : [onlineUser];
    await this.cacheManager.store.set(
      redisConstants.CONNECTED_NODES,
      updatedUsers,
    );

    return updatedUsers;
  }

  async updateNodesBySocket(socketCode: string) {
    let onlineUsers = (await this.cacheManager.store.get(
      redisConstants.CONNECTED_NODES,
    )) as Array<IOnlineNode>;
    onlineUsers = removeUsersBySocketCode(socketCode, onlineUsers);
    await this.cacheManager.store.set(
      redisConstants.CONNECTED_NODES,
      onlineUsers,
    );
    return onlineUsers;
  }

  async updateOnlineUsers(userNodes: IOnlineNode[]) {
    const uniqueUsers = userNodes
      .filter(
        (userWithSocket, index, self) =>
          index ===
          self.findIndex((u) => u.user._id === userWithSocket.user._id),
      )
      .map((userWithSocket) => userWithSocket.user);

    await this.cacheManager.store.set(redisConstants.ONLINE_USERS, uniqueUsers);
    return uniqueUsers;
  }

  async getConnectedNodes() {
    return (await this.cacheManager.get(
      redisConstants.CONNECTED_NODES,
    )) as IOnlineNode[];
  }

  async getAllMessagesByUserAndReceiver(
    user: Partial<User>,
    receiver: Partial<IOnlineUser>,
  ) {
    if (receiver.roomType === ERoom.public) {
      return await this.repository.findAll({
        $or: [{ receiverId: receiver._id }],
      });
    }
    return await this.repository.findAll({
      $or: [
        { userId: user._id, receiverId: receiver._id },
        { userId: receiver._id, receiverId: user._id },
      ],
    });
  }

  async getInfoFromOnlineUsers(userId: string) {
    const onlineUsers = (await this.cacheManager.store.get(
      redisConstants.CONNECTED_NODES,
    )) as Array<IOnlineNode>;
    return filterSocketUserInfo(userId, onlineUsers);
  }

  async messageToUser(client: Socket, chatMessage: ChatMessage) {
    if (chatMessage.roomType === ERoom.public) {
      client.to(chatMessage.receiverId).emit(socketEvents.message, chatMessage);
    }
  }

  async enterRoom(room: string, clientSocket: Socket, user: Partial<User>) {
    this.logger.log('Entering to room : ', room);
    clientSocket.join(clientSocket.id);

    const objs = await this.repository.findAll({ receiverId: room });
    return objs.map((value) => {
      return value.toJSON();
    });
  }

  async leaveRoom(roomId: string, socketId: string) {
    const key = `${roomId}_${socketId}`;
    await this.cacheManager.store.del(key);
  }

  async addToConnectedUsers() {
    await this.cacheManager.store.get(redisConstants.CONNECTED_NODES);
    await this.cacheManager.store.set(redisConstants.CONNECTED_NODES, []);
  }
}
