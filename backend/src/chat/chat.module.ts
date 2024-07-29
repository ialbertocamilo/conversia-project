import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatMessageMongoRepository } from './chat-message-mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessage, ChatMessageSchema } from './schema/messages-schema';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/schema/user-schema';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [ChatGateway, ChatService, ChatMessageMongoRepository],
  imports: [
    AuthModule,
    UserModule,
    SharedModule,
    MongooseModule.forFeature([
      { name: ChatMessage.name, schema: ChatMessageSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class ChatModule {}
