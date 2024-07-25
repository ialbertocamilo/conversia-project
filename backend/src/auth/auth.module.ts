import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from '../common/constants';
import {UserModule} from '../user/user.module';
import {SharedModule} from '../shared/shared.module';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/schema/user-schema";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UserModule,
        SharedModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60m'},
        }),
    ],
    exports:[AuthService]
})
export class AuthModule {
}
