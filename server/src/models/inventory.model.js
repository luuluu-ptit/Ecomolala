'use strict';

const { model, Schema } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventories';

// Declare the Schema of the Mongo model
var inventorySchema = new Schema({
    inventory_shopId: { type: Schema.Types.ObjectId, ref: 'Shop' },
    inventory_productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    inventory_location: { type: String, default: "Unknow" },
    inventory_reservation: { type: Number, required: true },

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = {
    inventories: model(DOCUMENT_NAME, inventorySchema)
}