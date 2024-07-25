import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

import {Server, Socket} from 'socket.io';
import {ChatService} from './chat.service';
import {Inject, Logger, OnModuleInit, UseGuards} from '@nestjs/common';
import {AuthSocketGuard} from "../auth/auth-socket.guard";
import {UserService} from "../user/user.service";
import {IGenericService} from "../shared/generic-service";
import {User} from "../user/schema/user-schema";
import {AuthService} from "../auth/auth.service";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {RedisCache} from "cache-manager-redis-yet";
import {socketEvents} from "../common/constants";
import {getUsersExceptMe} from "../common/utils";


@WebSocketGateway({cors: {origin: '*'}})
export class ChatGateway implements OnModuleInit, OnGatewayConnection {
    @WebSocketServer()
    server: Server;
    private readonly logger = new Logger()
    private connectedUsers: { [userId: string]: Socket } = {};

    constructor(private readonly chatService: ChatService,
                @Inject(UserService) private readonly userService: IGenericService<User>,
                @Inject(AuthService) private readonly authService: AuthService,
                @Inject(CACHE_MANAGER) private cacheManager: RedisCache
    ) {
    }

    async handleConnection(client: Socket) {
        this.connectedUsers[client.id] = client;
        const token = client.handshake.headers.authorization
        const user = await this.authService.wsAuth(token)
        if (!user) {
            client.disconnect(true);
            return;
        }
        const onlineUsers = await this.chatService.addOnlineUser(user, client.id)
        client.emit(socketEvents.usersList, getUsersExceptMe(user, onlineUsers))
        this.logger.log(`Client Socket list: `)
        console.log(Object.keys(this.connectedUsers))
        this.logger.log(`Client : \x1b[31m ${client.id} \x1b[0m connected.`);
    }

    async handleDisconnect(client: Socket) {
        this.logger.log(`Client : \x1b[31m ${client.id} \x1b[0m disconnected.`);
        const onlineUsers = await this.chatService.removeSocketFromOnlineList(client.id)
        this.server.emit(socketEvents.usersList, onlineUsers)
        client.disconnect()
        delete this.connectedUsers[client.id];
    }

    onModuleInit(): any {
        console.log('Websocket initialized, url', process.env.FRONTEND_URL);
    }

    @SubscribeMessage(socketEvents.message)
    @UseGuards(AuthSocketGuard)
    async onMessage(
        @MessageBody() message: IMessage,
        @ConnectedSocket() client: Socket
    ) {
        let user = client.handshake.headers?.user as string
        if (!user) {
            client.disconnect(true);
            return;
        }
        const userObject = JSON.parse(user) as User
        this.logger.log(`Sending messages to ${client.id}| `)
        client.emit('message', message);
        await this.chatService.create({
            userId: String(userObject?._id),
            receiverId: message.receiverId,
            message: message.message,
        })
    }

    @SubscribeMessage(socketEvents.enterRoom)
    @UseGuards(AuthSocketGuard)
    async onEnterRoom(
        @MessageBody() receiverUser: User,
        @ConnectedSocket() client: Socket
    ) {
        this.logger.log('onEnterRoom')

        let user = client.handshake.headers?.user as string
        this.logger.log(user)
        if (!user) {
            client.disconnect(true);
            return;
        }
        const userObject = JSON.parse(user) as User
        const messages = await this.chatService.getAllMessagesByUserAndReceiver(userObject._id, receiverUser._id)
        client.emit(socketEvents.getAllMessages, messages)
    }
}