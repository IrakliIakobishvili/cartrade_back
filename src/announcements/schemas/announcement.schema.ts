import * as mongoose from 'mongoose';

export const AnnouncementSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },   
    personal_id: {
        type: Number,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }, 

},
    { timestamps: true }
);
