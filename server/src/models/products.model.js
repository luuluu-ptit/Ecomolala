'use strict';

const { model, Schema } = require('mongoose'); // Erase if already required
const slugify = require('slugify');

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_slug: String,
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: { type: Number, required: true },
    product_ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be above 5.0'],
        set: (val) => Math.round(val * 10) / 10 //4.3455554 -> 4.3
    },
    product_variations: { type: Array, default: [] },
    product_type: {
        type: String,
        require: true,
        enum: ['Electronics', 'Clothing', 'Furniture']
    },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, require: true, },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        // select: false
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
        // select: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

//create index for search 
productSchema.index({ product_name: 'text', product_description: 'text' });

//document middleware : run before .save() and create() ...
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    next();
})

const clothingSchema = new Schema({
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
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
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
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