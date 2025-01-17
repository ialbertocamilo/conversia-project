import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id?: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: new Date() })
  createdAt?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
