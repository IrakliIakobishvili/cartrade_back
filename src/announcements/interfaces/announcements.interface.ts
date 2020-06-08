import { Document } from 'mongoose';

export interface Announcement extends Document {
    id?: string;
    firstName: string;
    lastName: string;
    personal_id: Number;
    phone: String;
    address: String;
}
