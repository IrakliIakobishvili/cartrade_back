import { IsNotEmpty, IsString, IsArray, IsObject } from "class-validator";
import { Places } from '../interfaces/gallery.interface'

export class CreateGalleryDto {
    @IsNotEmpty()
    @IsObject()
    readonly car_id: object;

    @IsNotEmpty()
    @IsObject()
    readonly places: object;
    // readonly places: Array<Places>;
}

// interface Places {
//     purchasing: Array<any>
//     car_id: Array<any>;
//     places: Array<any>;
// }

// export interface Gallery {
//     id?: string;
//     car_id: string;
//     places: Array<Places>;
// }