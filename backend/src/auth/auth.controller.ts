import {
  Body,
  Controller,
  Get,
  HttpCode,
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
    return this.userService.create({
      ...createUserDto,
      password: await encrypt(createUserDto.password),
    });
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
