'use strict';
const crypto = require('crypto');
const { model, Schema } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'checkoutOrder';
const COLLECTION_NAME = 'checkoutOrders';

// Declare the Schema of the Mongo model
var checkoutOrderSchema = new Schema({

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, checkoutOrderSchema);