import { Document } from 'mongoose';

export interface JwtPayload  {
    email: string;
    role: string;
}