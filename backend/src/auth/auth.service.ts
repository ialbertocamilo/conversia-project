import {Inject, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {IGenericService} from "../shared/generic-service";
import {User} from "../user/schema/user-schema";
import {decrypt} from "../common/utils";
import {jwtConstants} from "../common/constants";
import {IUserToken} from "../shared/interfaces/user-token.interface";

@Injectable()
export class AuthService {

    private readonly logger = new Logger()

    constructor(@Inject(UserService) private readonly userService: IGenericService<User>, private jwtService: JwtService) {
    }


    async signIn(
        username: string,
        password: string,
    ): Promise<{ access_token: string; user: Partial<User> }> {
        const user = await this.userService.findOne(null, {username});
        if (!user) {
            throw new UnauthorizedException();
        }
        const result = await decrypt(password, user.password)
        if (!result)
            throw new UnauthorizedException()

        const payload = {sub: user._id, username: user.username};
        const objUser = Object.assign(user)
        return {
            user: {username: user.username, _id: user._id, name: user.name, createdAt: user.createdAt},
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    async wsAuth(token: string): Promise<User | null> {
        if (!token)
            throw new UnauthorizedException();
        try {
            const result: IUserToken | null = await this.jwtService.verify(
                token,
                {
                    secret: jwtConstants.secret,
                }
            );
            if (!result)
                throw new UnauthorizedException();
            const user = await this.userService.findOne(result.sub, null, '-password')
            if (user) {
                return user;
            }
            return null
        } catch (e) {
            this.logger.error(e)
        }
    }
}
