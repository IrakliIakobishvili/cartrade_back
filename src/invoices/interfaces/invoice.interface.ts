import { Document } from 'mongoose';

export interface Invoice extends Document {
    id?: string;
    bill_to: string;
    send_to: string;
    date: Date;
    due_date: Date;
    items: Array<any>;
}