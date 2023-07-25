'use strict';

const { model, Schema } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_thumb: {
        type: String,
        required: true,
    },
    product_description: String,
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_type: {
        type: String,
        require: true,
        enum: ['Electronics', 'Clothing', 'Furniture']
    },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, require: true, }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    size: String,
    material: String,
}, {
    timestamps: true,
    collection: 'clothes'
}
);

const electronicSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    model: String,
    color: String,
}, {
    timestamps: true,
    collection: 'electronics'
}
);

//Export the model
module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronics: model('Electronics', electronicSchema),
}