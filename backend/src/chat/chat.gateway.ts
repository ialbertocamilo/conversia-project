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
import {Inject, Logger, OnModuleInit, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthSocketGuard} from "../auth/auth-socket.guard";
import {UserService} from "../user/user.service";
import {IGenericService} from "../shared/generic-service";
import {User} from "../user/schema/user-schema";
import {AuthService} from "../auth/auth.service";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {RedisCache} from "cache-manager-redis-yet";
import {socketEvents} from "../common/constants";
import {IMessage, RoomEnum} from "./interfaces/message.interface";
import {Types} from 'mongoose';
import {isRoom} from "../common/utils";


@WebSocketGateway({cors: {origin: '*'}})
@UsePipes(new ValidationPipe({transform: true}))
export class ChatGateway implements OnModuleInit, OnGatewayConnection {
    @WebSocketServer()
    server: Server;
    private readonly logger = new Logger()
    private connectedUsers: Socket[] = [];

    constructor(private readonly chatService: ChatService,
                @Inject(UserService) private readonly userService: IGenericService<User>,
                @Inject(AuthService) private readonly authService: AuthService,
                @Inject(CACHE_MANAGER) private cacheManager: RedisCache
    ) {
    }

    async handleConnection(client: Socket) {
        try {
            this.connectedUsers[client.id] = client;
            const token = client.handshake.headers.authorization
            const user = await this.authService.wsAuth(token)
            if (!user) {
                client.disconnect(true);
                return;
            }
            await this.chatService.addOnlineUser(user, client.id)
            const onlineUsers = await this.chatService.removeSocketFromOnlineList(Object.keys(this.connectedUsers))

            this.server.emit(socketEvents.usersList, onlineUsers)
            this.logger.log(`Client : \x1b[31m ${client.id} \x1b[0m connected.`);
        } catch (e) {
            this.logger.error(e)
        }
    }

    async handleDisconnect(client: Socket) {
        delete this.connectedUsers[client.id];
        this.logger.log(`Client : \x1b[31m ${client.id} \x1b[0m disconnected.`);
        this.logger.log(`Clients: `, Object.keys(this.connectedUsers))
        const onlineUsers = await this.chatService.removeSocketFromOnlineList(Object.keys(this.connectedUsers))
        this.server.emit(socketEvents.usersList, onlineUsers)
        client.disconnect()
    }

    async onModuleInit() {
        try {
            console.log('Websocket initialized, url', process.env.FRONTEND_URL);
            const onlineUsers = await this.chatService.removeSocketFromOnlineList(Object.keys(this.connectedUsers))
            this.server.emit(socketEvents.usersList, onlineUsers)
        } catch (e) {
            this.logger.error(e)
        }
    }

    @SubscribeMessage(socketEvents.message)
    @UseGuards(AuthSocketGuard)
    async onMessage(
        @MessageBody() message: IMessage,
        @ConnectedSocket() client: Socket
    ) {
        try {
            let user = client.handshake.headers?.user as string
            if (!user) {
                client.disconnect(true);
                return;
            }
            const authUser = JSON.parse(user) as User
            this.logger.log(`Sending message to ${message.receiverId}| `, message)

            if (isRoom(message.receiverId as RoomEnum))
                await this.chatService.messageToRoom(message, this.server, authUser)
            else
                await this.chatService.messageToUser(message, this.connectedUsers, authUser)
            await this.chatService.create({
                userId: String(authUser?._id),
                receiverId: message.receiverId,
                message: message.message,
            })

        } catch (e) {
            this.logger.error(e)
        }
    }

    @SubscribeMessage('enter_room')
    @UseGuards(AuthSocketGuard)
    async onEnterRoom(
        @MessageBody() receiverUser: User,
        @ConnectedSocket() client: Socket
    ) {
        this.logger.log('onEnterRoom')
        let messages: {
            type: string;
            userId: string;
            receiverId: string;
            message: string;
            createdAt?: Date;
            deletedAt?: Date;
            _id: Types.ObjectId;
        }[]
        let user = client.handshake.headers?.user as string
        if (!user) {
            client.disconnect(true);
            return;
        }
        const userObject = JSON.parse(user) as User

        const connected = await this.chatService.enterRoom(receiverUser._id, client.id, userObject)
        if (!connected) {
            messages = await this.chatService.getAllMessagesByUserAndReceiver(userObject._id, receiverUser._id)
        }
        client.emit(socketEvents.getAllMessages, messages)
    }
}