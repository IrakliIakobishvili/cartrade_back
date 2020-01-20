import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    diler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    gallery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gallery"
    },
    // comments: [
    //     {
    //         author: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User"
    //         },
    //         message: {
    //             type: String
    //         },
    //         date: {
    //             type: Date,
    //             default: () => {
    //                 return Date.now();
    //             }
    //         }
    //     }
    // ],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    details: {
        year: Number,
        brand: String,
        model: String,
        vin: Number,
        price: Number
    }
},
    { timestamps: true },
    // { virtuals: true }
);

// Duplicate the ID field.
// CarSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

CarSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});