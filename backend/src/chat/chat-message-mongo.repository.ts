import {GenericMongoRepository} from "../shared/generic-mongo-repository.service";
import {ChatMessage, ChatMessageDocument} from "./schema/messages-schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ChatMessageMongoRepository extends GenericMongoRepository<ChatMessage> {
    constructor(
        @InjectModel(ChatMessage.name) protected readonly modelName: Model<ChatMessageDocument>,
    ) {
        super(modelName);
    }
}