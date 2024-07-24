import {Body, Controller, Get, HttpCode, Inject, Post, Request, UseGuards,} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {IGenericService} from "../shared/generic-service";
import {User} from "../user/schema/user-schema";
import {encrypt} from "../common/utils";
import {LoginAuthDto} from "./dto/login-auth.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(UserService) private readonly userService: IGenericService<User>,
        @Inject(AuthService) private readonly authService: AuthService
    ) {
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {

        return this.userService.create({...createUserDto, password: await encrypt(createUserDto.password)});
    }

    @Post('/login')
    @HttpCode(200)
    async login(@Body() loginUserDto: LoginAuthDto) {
        return this.authService.signIn(loginUserDto.username, loginUserDto.password)
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Request() req: { user }) {
        return req.user;
    }
}
