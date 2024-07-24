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
import {Inject, OnModuleInit, UseGuards} from '@nestjs/common';
import {AuthSocketGuard} from "../auth/auth-socket.guard";
import {IUserToken} from "../shared/interfaces/user-token.interface";
import {UserService} from "../user/user.service";
import {IGenericService} from "../shared/generic-service";
import {User} from "../user/schema/user-schema";

enum MessengerType {
    SENDER,
    RECEIVER,
};

interface IMessage {
    author: string;
    message: string;
    time: Date;
    type?: MessengerType
}

@WebSocketGateway({cors: {origin: '*'}})
export class ChatGateway implements OnModuleInit, OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    private connectedUsers: { [userId: string]: Socket } = {};

    constructor(private readonly chatService: ChatService, @Inject(UserService) private readonly userService: IGenericService<User>) {
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client : \x1b[31m ${client.id} \x1b[0m connected.`);
        this.connectedUsers[client.id] = client;
        console.log(`Clients `, Object.keys(this.connectedUsers))
    }

    handleDisconnect(client: Socket) {
        console.log(`Client : \x1b[31m ${client.id} \x1b[0m disconnected.`);
        delete this.connectedUsers[client.id];
    }

    onModuleInit(): any {
        console.log('Websocket initialized, url', process.env.FRONTEND_URL);
    }

    @SubscribeMessage('message')
    @UseGuards(AuthSocketGuard)
    async onMessage(
        @MessageBody() message: IMessage,
        @ConnectedSocket() client: Socket,
    ) {
        const user = client.handshake.headers?.user as unknown as IUserToken
        const receiverSocket = this.connectedUsers[client.id];

        console.log(`Clients receiving messages: `, Object.keys(this.connectedUsers))
        const userSender = await this.userService.findOne(user.sub)
        console.log(`Sender :`, userSender)
        console.log(`Message :`, message)
        // console.log(`Client :`, client.handshake.)
        if (receiverSocket) {
            receiverSocket.emit('message', message);
            await this.chatService.create({
                userId: String(userSender._id),
                receiverId: "",
                message: message.message
            })
        } else {
            console.log('Receiver is not online');
        }
    }
}