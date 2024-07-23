import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IGenericService } from '../shared/generic-service';
import { User } from './schema/user-schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: IGenericService<User>,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
