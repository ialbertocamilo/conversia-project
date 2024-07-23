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
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client : \x1b[31m ${client.id} \x1b[0m connected.`);
  }

  onModuleInit(): any {
    console.log('Websocket initialized.');
  }

  @SubscribeMessage('message')
  onMessage(
    @MessageBody()
    data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('receiving message ');
    client.emit('message', `Botame tu gaaa EVENTS ${client.id}`);
  }
}
