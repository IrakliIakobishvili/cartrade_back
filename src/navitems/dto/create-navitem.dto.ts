// import { IsNotEmpty, IsString, IsNumber } from "class-validator";
// import { Schema, model, Document, Model } from 'mongoose';

// export class CreateNavitemDto  {
//     @IsNotEmpty()
//     @IsString()
//     readonly name: string;

//     @IsNotEmpty()
//     @IsString()
//     readonly url: string;

//     @IsNotEmpty()
//     @IsNumber()
//     readonly level: number;
// }

export class CreateNavitemDto  {
    // id?: string;
    name: string;
    url: string;
    level: number;
}

