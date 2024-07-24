import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {ChatModule} from './chat/chat.module';
import {MongooseModule} from '@nestjs/mongoose';
import {SharedModule} from './shared/shared.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/db'), ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        ChatModule,
        SharedModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
