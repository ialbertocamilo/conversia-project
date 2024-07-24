import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {jwtConstants} from "../common/constants";
import {Socket} from "socket.io";

@Injectable()
export class AuthSocketGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let token = context.switchToWs().getClient<Socket>().handshake.headers?.authorization as string
        const request = context.switchToWs().getClient<Socket>();
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
            request.handshake.headers['user'] = result
        } catch {
            console.log("Exception")
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}