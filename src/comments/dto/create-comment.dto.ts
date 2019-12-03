import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsString()
    readonly car: string;

    @IsNotEmpty()
    @IsString()
    readonly message: string;
}
