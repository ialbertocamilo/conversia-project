import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../shared/shared.module';
import { GenericService } from '../shared/generic-service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema';

@Module({
  controllers: [UserController],
  providers: [UserService, GenericService],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
