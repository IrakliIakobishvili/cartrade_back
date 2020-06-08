import { Schema, model, Document, Model } from 'mongoose';

export interface NavigationItem extends Document {
    // id?: string;
    readonly  name: string;
    readonly  url: string;
    readonly  level: number;
    readonly  active: boolean;
    readonly  children: Array<any>
}

