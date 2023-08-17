'use strict';

const { model, Schema } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventories';

// Declare the Schema of the Mongo model
var inventorySchema = new Schema({
    inventory_productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    inventory_shopId: { type: Schema.Types.ObjectId, ref: 'Shop' },
    inventory_location: { type: String, default: "Unknow" },
    inventory_stock: { type: Number, required: true },
    inventory_reservation: { type: Array, required: [] },
    /*
    inventory_reservation : 
        cartId,
        stock : 1,
        createdOn 
    */

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = {
    inventories: model(DOCUMENT_NAME, inventorySchema)
}

// dat hang => tru so luong o hang ton kho...
/*
    + product : thuoc tinh shop ban, duyet, hien thi sp, 
    + inventory: luu tru thong tin ve muc ton kho :cong no, don vi, vi tri ton kho, thong tin lien quan..., 
    + order, 
    + cart, 
    + payment
    khi update 1 product se khong bi anh huong...
*/