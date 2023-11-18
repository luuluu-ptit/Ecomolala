
// const { model, Schema } = require("mongoose");

// const DOCUMENT_NAME = 'shopDetail';
// const COLLECTION_NAME = 'shopDetails';

// const shopDetailSchema = new Schema({
//     _id: {
//         type: Schema.Types.ObjectId,
//         ref: 'Shop',
//     },
//     fullName: {
//         type: String
//     },
//     phone: {
//         type: String,
//         required: [true, "Phone number can't be blank"],
//         unique: true,
//         match: [/^\d{10}$/, 'is invalid'],
//         index: true
//     },
//     address: {
//         address: String,
//         street: String,
//         city: String,
//         district: String,
//         zip: String,
//         country: String

//     },
//     payment: {
//         method: {
//             type: String,
//             enum: ['Bank Card', 'Cash On Delivery'],
//             required: true
//         },
//         bankName: {
//             type: String,
//             accountNumber: String,
//             bankName: String,
//             required: function () {
//                 return this.payment.method === 'Bank Card';
//             }
//         },
//         status: {
//             type: String,
//             enum: ['Pending', 'Completed', 'Failed'],
//             default: 'Pending'
//         }
//     },
//     shipping: {
//         company: {
//             type: String,
//             required: true
//         }
//     }
// }, {
//     timestamps: true,
//     collection: COLLECTION_NAME
// });

// //Export the model
// module.exports = model(DOCUMENT_NAME, shopDetailSchema);