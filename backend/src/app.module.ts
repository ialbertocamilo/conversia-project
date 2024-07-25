import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {ChatModule} from './chat/chat.module';
import {MongooseModule} from '@nestjs/mongoose';
import {SharedModule} from './shared/shared.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CACHE_MANAGER, CacheModule,CacheStore} from "@nestjs/cache-manager";
import {redisStore} from 'cache-manager-redis-yet';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://localhost/db'), ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        ChatModule,
        SharedModule,
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: (await redisStore({
                    url: "redis://localhost:6379/",
                })) as unknown as CacheStore,
            })
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
