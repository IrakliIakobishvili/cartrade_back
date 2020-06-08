import { Document } from 'mongoose';

export interface Car extends Document {
    id?: string;
    owner: string;
    diler: string;
    comments: Array<any>;
    gallery: String;
    details: object;
}
