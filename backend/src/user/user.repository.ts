import { Injectable } from '@nestjs/common';
import { UserSchema } from './schema/user-schema';
import { GenericMongoRepository } from '../shared/generic-mongo-repository.service';

@Injectable()
export class UserRepository extends GenericMongoRepository<typeof UserSchema> {}
