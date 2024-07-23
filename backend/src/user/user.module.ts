import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../shared/shared.module';
import { GenericService } from '../shared/generic-service';

@Module({
  controllers: [UserController],
  providers: [UserService, GenericService],
  imports: [SharedModule],
})
export class UserModule {}
