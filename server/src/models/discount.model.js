'use strict';

const { model, Schema } = require('mongoose');
const DOCUMENT_NAME = 'Discount';
const COLLECTION_NAME = 'Discounts';

// Declare the Schema of the Mongo model
var discountSchema = new Schema({
    discount_name: { type: String, required: true },
    discount_description: { type: String, required: true },
    discount_type: { type: String, default: 'fixed_amount' }, //percentage
    discount_value: { type: Number, required: true },
    discount_max_value: { type: Number, required: true },
    discount_code: { type: String, required: true },
    discount_start_date: { type: Date, required: true },
    discount_end_date: { type: Date, required: true },
    discount_max_uses: { type: Number, required: true }, //so luong discount duoc ap dung
    discount_uses_count: { type: Number, required: true }, //so discount da su dung
    discount_users_used: { type: Array, required: [] }, //ds user da su dung
    discount_max_uses_per_user: { type: Number, required: true }, //so discount duoc ap dung tren 1 user
    discount_min_order_value: { type: Number, required: true }, // gia tri don hang nho nhat
    discount_shopId: { type: Schema.Types.ObjectId, ref: 'Shop' },

    discount_is_active: { type: Boolean, default: true },
    discount_applies_to: { type: String, required: true, enum: ['all', 'special',] },
    discount_product_ids: { type: Array, required: [] }, // so san pham duoc ap dung
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

module.exports = model(DOCUMENT_NAME, discountSchema);