import {Module} from '@nestjs/common';
import {ChatService} from './chat.service';
import {ChatGateway} from './chat.gateway';
import {ChatMessageMongoRepository} from "./chat-message-mongo.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {ChatMessage, ChatMessageSchema} from "./schema/messages-schema";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {UserMongoRepository} from "../user/user-mongo.repository";
import {User, UserSchema} from "../user/schema/user-schema";

@Module({
    providers: [ChatGateway, ChatService, ChatMessageMongoRepository
    ],
    imports: [
        UserModule,
        MongooseModule.forFeature([{name: ChatMessage.name, schema: ChatMessageSchema}, {
            name: User.name,
            schema: UserSchema
        }])]
})
export class ChatModule {
}
