import { Inject, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user-schema';
import { GenericService } from '../shared/generic-service';
import { IGenericRepository } from '../shared/generic-mongo-repository.service';
import { UserMongoRepository } from './user-mongo.repository';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @Inject(UserMongoRepository)
    protected readonly repository: IGenericRepository<UserDocument>,
  ) {
    super(repository);
  }
}
