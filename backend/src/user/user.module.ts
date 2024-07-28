import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema';
import { UserMongoRepository } from './user-mongo.repository';
import { GenericService } from '../shared/service/generic-service';

@Module({
  controllers: [UserController],
  providers: [UserService, GenericService, UserMongoRepository],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService, GenericService, UserMongoRepository],
})
export class UserModule {}
