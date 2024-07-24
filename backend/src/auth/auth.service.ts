import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {IGenericService} from "../shared/generic-service";
import {User} from "../user/schema/user-schema";
import {decrypt} from "../common/utils";

@Injectable()
export class AuthService {
    constructor(@Inject(UserService) private readonly userService: IGenericService<User>, private jwtService: JwtService) {
    }


    async signIn(
        username: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(null, {username});
        if (!user) {
            throw new UnauthorizedException();
        }
        const result = await decrypt(password, user.password)
        if (!result)
            throw new UnauthorizedException()

        const payload = {sub: user._id, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
