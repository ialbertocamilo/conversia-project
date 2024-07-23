import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  createdAt?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
