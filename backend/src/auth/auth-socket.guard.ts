import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants, socketEvents } from '../common/constants';
import { Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user-schema';
import { IGenericService } from '../shared/service/generic-service';

@Injectable()
export class AuthSocketGuard implements CanActivate {
  private readonly logger = new Logger();

  constructor(
    private jwtService: JwtService,
    @Inject(UserService) private readonly userService: IGenericService<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToWs().getClient<Socket>().handshake.headers
      ?.authorization as string;
    const request = context.switchToWs().getClient<Socket>();
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const result = await this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.userService.findOne(
        result.sub,
        null,
        '-password',
      );
      if (user) request.handshake.headers['user'] = JSON.stringify(user);
      return true;
    } catch (e) {
      request.emit(socketEvents.notifyError, e);
      this.logger.error(e);
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
