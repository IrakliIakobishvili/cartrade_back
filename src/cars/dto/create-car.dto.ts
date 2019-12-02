import { IsNotEmpty, IsString, IsArray, IsObject, MinLength, MaxLength, IsNumber } from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    readonly owner: string;

    @IsNotEmpty()
    @IsString()
    readonly diler: string;

    @IsNotEmpty()
    @IsArray()
    readonly comments: Array<any>;

    @IsObject()
    readonly details: object;
}
