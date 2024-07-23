import { Injectable } from '@nestjs/common';
import { User } from './schema/user-schema';
import { GenericRepository } from '../shared/generic-repository';

@Injectable()
export class UserRepository extends GenericRepository<User> {}
