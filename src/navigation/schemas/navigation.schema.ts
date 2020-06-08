import * as mongoose from 'mongoose';

export const NavigationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    children: {
        type: Array
    }
},
    { timestamps: true }
);
