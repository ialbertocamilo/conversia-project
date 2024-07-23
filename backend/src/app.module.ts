import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ChatModule,
    SharedModule,
    MongooseModule.forRoot('mongodb://localhost/db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
