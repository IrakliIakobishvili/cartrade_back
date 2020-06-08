import { Document } from 'mongoose';

export interface NavItem extends Document {
    // id?: string;
    name: string;
    url: string;
    level: number;
}