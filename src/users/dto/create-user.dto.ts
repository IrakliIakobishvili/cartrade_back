import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional, IsArray } from 'class-validator';
import { IsNotBlank } from './../../shared/validators/is-not-blank.validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly role: string;

    @IsEmail({}, { message: 'Is not a valid email' })
    @IsNotEmpty()
    @IsOptional()
    readonly email: string;

    // @IsEmail({}, { message: 'Method is required!' })
    @IsNotEmpty({ message: 'Method is required!' })
    // @IsOptional()
    readonly method: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @IsNotBlank("password", { //what password does?????????????
        /* you can also use additional validation options, like "groups" in your custom validation decorators. "each" is not supported */
        message: "Password must not be empty"
    })
    public password: string;
}