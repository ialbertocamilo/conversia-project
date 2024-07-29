import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user-schema';
import { encrypt } from '../common/utils';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RateLimiterGuard } from '../shared/rate-limiter.guard';
import { IGenericService } from '../shared/service/generic-service';
import { Document } from 'mongoose';

@Controller('auth')
@UseGuards(RateLimiterGuard)
export class AuthController {
  private readonly logger = new Logger();

  constructor(
    @Inject(UserService) private readonly userService: IGenericService<User>,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findOne(null, {
      username: createUserDto.username,
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const createdUser = (await this.userService.create({
      ...createUserDto,
      password: await encrypt(createUserDto.password),
    })) as unknown as Document;
    return { ...createdUser.toJSON(), password: undefined };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginAuthDto) {
    try {
      return this.authService.signIn(
        loginUserDto.username,
        loginUserDto.password,
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req: { user }) {
    return req.user;
  }
}
