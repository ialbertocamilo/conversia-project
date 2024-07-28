import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user-schema';
import { decrypt } from '../common/utils';
import { jwtConstants } from '../common/constants';
import { IUserToken } from '../shared/interfaces/user-token.interface';
import { Socket } from 'socket.io';
import { Document } from 'mongoose';
import { IGenericService } from '../shared/service/generic-service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    @Inject(UserService) private readonly userService: IGenericService<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const user = await this.userService.findOne(null, { username });
    if (!user) {
      throw new UnauthorizedException();
    }
    const result = await decrypt(password, user.password);
    if (!result) throw new UnauthorizedException();

    const payload = { sub: user._id, username: user.username };
    return {
      user: {
        username: user.username,
        _id: user._id,
        name: user.name,
        createdAt: user.createdAt,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async wsAuth(token: string, client: Socket): Promise<User | null> {
    if (!token) {
      client?.disconnect(true);
      throw new UnauthorizedException();
    }
    const result: IUserToken | null = await this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    if (!result) {
      this.logger.error('Token is invalid');
      client?.disconnect(true);
      return null;
    }
    const user = await this.userService.findOne(result.sub, null, '-password');
    if (!user) {
      this.logger.error('User not found | Disconnected.');
      client?.disconnect(true);
      throw new UnauthorizedException();
    }

    const myUser = user as unknown as Document;
    return { ...myUser.toJSON(), _id: String(user._id) };
  }

  async wsGetMyUser(client: Socket) {
    this.logger.log('Getting my user');
    const user = client.handshake.headers?.user as string;
    if (!user) {
      client.disconnect(true);
      throw new UnauthorizedException();
    }
    return JSON.parse(user) as Partial<User>;
  }
}
