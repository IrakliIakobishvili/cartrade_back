import { Document } from 'mongoose';

export interface Gallery extends Document {
    id?: string;
    car_id: string;
    places: object
}