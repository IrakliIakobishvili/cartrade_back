import { Schema, model, Document, Model } from 'mongoose';

export interface Item extends Document {
  id?: string;
  name: string;
  description?: string;
  qty: number;
}
