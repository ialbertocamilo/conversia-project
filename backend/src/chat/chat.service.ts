import {Inject, Injectable} from '@nestjs/common';
import {GenericService} from "../shared/generic-service";
import {ChatMessage, ChatMessageDocument} from "./schema/messages-schema";
import {UserMongoRepository} from "../user/user-mongo.repository";
import {IGenericRepository} from "../shared/generic-mongo-repository.service";
import {UserDocument} from "../user/schema/user-schema";
import {ChatMessageMongoRepository} from "./chat-message-mongo.repository";

@Injectable()
export class ChatService extends GenericService<ChatMessage> {
  constructor(
    @Inject(ChatMessageMongoRepository)
    protected readonly repository: IGenericRepository<ChatMessageDocument>,
  ) {
    super(repository);
  }}
