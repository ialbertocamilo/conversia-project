import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import {
  Inject,
  Logger,
  OnModuleInit,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthSocketGuard } from '../auth/auth-socket.guard';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user-schema';
import { AuthService } from '../auth/auth.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import { socketEvents } from '../common/constants';
import { IMessage, IOnlineUser } from './interfaces/chat.interface';
import { IGenericService } from '../shared/service/generic-service';
import { RateLimiterGuard } from '../shared/rate-limiter.guard';

@WebSocketGateway({ cors: { origin: '*' } })
@UsePipes(new ValidationPipe({ transform: true }))
export class ChatGateway implements OnModuleInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger();

  constructor(
    private readonly chatService: ChatService,
    @Inject(UserService) private readonly userService: IGenericService<User>,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
  ) {}

  async onModuleInit() {
    try {
      console.log('Websocket initialized, url', process.env.FRONTEND_URL);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @UseGuards(AuthSocketGuard)
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization;
      const user = await this.authService.wsAuth(token, client);
      const userNodes = await this.chatService.addUserNode({
        user,
        socketId: client.id,
      });
      const onlineUsers = await this.chatService.updateOnlineUsers(userNodes);
      this.server.emit(socketEvents.usersList, onlineUsers);
      this.logger.log(`Client : \x1b[31m ${client.id} \x1b[0m connected.`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const arrayNodes = Array.from(this.server.sockets.sockets.keys());
      const onlineUsers =
        await this.chatService.updateNodesBySockets(arrayNodes);
      this.logger.log(`Client : \x1b[31m ${client.id} \x1b[0m disconnected.`);
      this.logger.log(`Clients: `, onlineUsers);
      this.server.emit(socketEvents.usersList, onlineUsers);
      client.disconnect();
    } catch (e) {
      this.logger.error(e);
    }
  }

  @SubscribeMessage(socketEvents.message)
  @UseGuards(AuthSocketGuard)
  @UseGuards(RateLimiterGuard)
  async onMessage(
    @MessageBody() message: IMessage,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const authUser = await this.authService.wsGetMyUser(client);

      const msg = await this.chatService.create({
        authorId: String(authUser?._id),
        receiverId: message.receiver._id,
        metadata: { name: message.author.name },
        roomType: message.receiver?.roomType,
        message: message.message,
      });
      await this.chatService.messageToUser(client, msg);
      const messages = await this.chatService.getAllMessagesByUserAndReceiver(
        authUser,
        message.receiver,
      );
      client.emit(socketEvents.getAllMessages, messages);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @SubscribeMessage(socketEvents.leaveRoom)
  @UseGuards(AuthSocketGuard)
  async onLeaveRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Leaving room ${roomId}`);
    client.leave(roomId);
    await this.chatService.leaveRoom(roomId, client.id);
  }

  @SubscribeMessage(socketEvents.joinRoom)
  @UseGuards(AuthSocketGuard)
  async onJoinRoom(
    @MessageBody() receiverUser: Partial<IOnlineUser>,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      this.logger.log('onJoinRoom');
      const authUser = await this.authService.wsGetMyUser(client);

      client.join(receiverUser._id);
      const messages = await this.chatService.getAllMessagesByUserAndReceiver(
        authUser,
        receiverUser,
      );
      client.emit(socketEvents.getAllMessages, messages);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
