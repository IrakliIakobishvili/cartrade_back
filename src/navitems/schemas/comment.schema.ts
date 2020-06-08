import * as mongoose from 'mongoose';

export const NavitemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String
    },
    level: {
        type: Number
    }
},
    { timestamps: true }
);
