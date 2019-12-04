import { IsNotEmpty, IsString, IsArray, IsObject } from "class-validator";

export class CreateGalleryDto {
    @IsNotEmpty()
    @IsString()
    readonly car_id: string;

    @IsNotEmpty()
    @IsObject()
    readonly places: object;
}