import { Module } from '@nestjs/common';
import { GenericService } from './generic-service';
import { GenericMongoRepository } from './generic-mongo-repository.service'; // Import GenericMongoRepository
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user-schema';
import { Model } from 'mongoose';

@Module({
  controllers: [],
  providers: [], // Add GenericMongoRepository to providers
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class SharedModule {}
