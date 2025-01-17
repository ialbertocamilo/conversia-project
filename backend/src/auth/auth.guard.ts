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
import { jwtConstants } from '../common/constants';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user-schema';
import { IGenericService } from '../shared/service/generic-service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger();

  constructor(
    private jwtService: JwtService,
    @Inject(UserService) private readonly userService: IGenericService<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
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
      if (!user) throw new UnauthorizedException();
      request['user'] = user;
      return true;
    } catch {
      this.logger.error('AuthGuard exception');
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
