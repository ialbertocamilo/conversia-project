import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user-schema';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { IGenericService } from '../shared/service/generic-service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: IGenericService<User>,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.userService.findAll();
  }
}
