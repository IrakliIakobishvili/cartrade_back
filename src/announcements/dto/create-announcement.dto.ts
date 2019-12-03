import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnnouncementDto {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    readonly personal_id: number;

    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @IsNotEmpty()
    @IsString()
    readonly address: string;
}
