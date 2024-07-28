import { Inject, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user-schema';
import { IGenericRepository } from '../shared/generic-mongo-repository.service';
import { UserMongoRepository } from './user-mongo.repository';
import { GenericService } from '../shared/service/generic-service';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @Inject(UserMongoRepository)
    protected readonly repository: IGenericRepository<UserDocument>,
  ) {
    super(repository);
  }
}
