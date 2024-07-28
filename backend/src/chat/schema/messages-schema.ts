import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ERoom } from '../interfaces/chat.interface';

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema()
export class ChatMessage {
  @Prop()
  authorId: string;

  @Prop()
  receiverId: string;

  @Prop()
  roomType: ERoom; //Tipo de mensaje publico o privado 0 o 1

  @Prop()
  message: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ default: new Date() })
  createdAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
