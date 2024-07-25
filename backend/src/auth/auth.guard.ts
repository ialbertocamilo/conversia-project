import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {jwtConstants} from "../common/constants";
import {UserService} from "../user/user.service";
import {IGenericService} from "../shared/generic-service";
import {User} from "../user/schema/user-schema";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, @Inject(UserService) private readonly userService: IGenericService<User>) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const result = await this.jwtService.verify(
                token,
                {
                    secret: jwtConstants.secret,
                }
            );
            const user = await this.userService.findOne(result.sub, null, '-password')
            if (!user)
                throw new UnauthorizedException();
            request['user'] = user
        } catch {
            console.log("Exception")
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}