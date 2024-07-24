import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user-schema';
import { GenericMongoRepository } from '../shared/generic-mongo-repository.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMongoRepository extends GenericMongoRepository<User> {
  constructor(
    @InjectModel(User.name) protected readonly modelName: Model<UserDocument>,
  ) {
    super(modelName);
  }
}
