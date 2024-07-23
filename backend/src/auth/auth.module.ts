import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../user/user.service';
import { GenericService } from '../shared/generic-service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, GenericService],
  imports: [
    UserModule,
    SharedModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
