import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user-schema';
import { GenericService } from '../shared/generic-service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectModel(User.name) protected readonly model: Model<UserDocument>,
  ) {
    super(model);
  }
}
