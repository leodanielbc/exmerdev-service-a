import { Document } from 'mongoose';

export interface Auth extends Document {
    _id: string;
    email: string;
    pass: string;
}