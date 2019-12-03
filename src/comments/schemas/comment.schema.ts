import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },    
    message: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);
