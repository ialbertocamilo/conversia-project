import { Injectable } from '@nestjs/common';
import { User } from './schema/user-schema';
import { GenericService } from '../shared/generic-service';

@Injectable()
export class UserService extends GenericService<User> {}
