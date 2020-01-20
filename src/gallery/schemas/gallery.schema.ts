import * as mongoose from 'mongoose';

export const GallerySchema = new mongoose.Schema({
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    places: {
        purchasing: {
            type: Array
        },
        parking: {
            type: Array
        },
        port: {
            type: Array
        }
    }
},
    { timestamps: true }
);

GallerySchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});