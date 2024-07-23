import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GenericService } from '../shared/generic-service';
import { User } from './schema/user-schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: GenericService<User>) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
