import * as mongoose from 'mongoose';

export const InvoiceSchema = new mongoose.Schema({
    // შესაცვლელია!!!!!!!!!!!!!
    bill_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    send_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },    
    date: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    due_date: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    items: {
        type: Array,
        required: true
    }
},
    { timestamps: true }
);





// import * as mongoose from 'mongoose';

// export const CarSchema = new mongoose.Schema({
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     diler: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     comments: [
//         {
//             author: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "User"
//             },
//             message: {
//                 type: String
//             },
//             date: {
//                 type: Date,
//                 default: () => {
//                     return Date.now();
//                 }
//             }
//         }
//     ],
//     details: {
//         year: Number,
//         brand: String,
//         model: String,
//         vin: Number,
//         price: Number
//     }
// },
//     { timestamps: true }
// );
