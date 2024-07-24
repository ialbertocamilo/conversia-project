import {IsNotEmpty, IsStrongPassword} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class LoginAuthDto {

    @ApiProperty({required: true})
    @IsNotEmpty()
    username: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    password: string;
}