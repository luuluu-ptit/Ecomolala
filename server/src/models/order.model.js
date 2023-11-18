'use strict';
const crypto = require('crypto');
const { model, Schema } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

// Declare the Schema of the Mongo model
var orderSchema = new Schema({
    order_userId: { type: Schema.Types.ObjectId, ref: 'Shop' },
    /* 
    order_checkout : {
        totalPrice,
        totalApplyDiscount,
        feeShip
    }
    */
    order_checkout: { type: Object, default: {} },
    /* 
    order_shipping : {
        totalPrice,
        totalApplyDiscount,
        feeShip
    }
    */
    order_shipping: { type: Object, default: {} },
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, required: true },
    order_tracking: { type: String, default: "00000001" },
    order_status: { type: String, enum: ["pendding", "confirmed", "shipped", "canceled", "sucessfully"], default: "pendding" },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, orderSchema);