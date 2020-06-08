import { Document } from 'mongoose';

export interface Comment extends Document {
    id?: string;
    author: string;
    car: string;
    message: string;
}