import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;
}
