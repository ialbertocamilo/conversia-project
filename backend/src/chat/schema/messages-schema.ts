import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema()
export class ChatMessage {
    @Prop()
    userId: string

    @Prop()
    receiverId: string

    @Prop()
    message: string;

    @Prop({default: Date.now})
    createdAt?: Date

    @Prop()
    deletedAt?: Date

}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
