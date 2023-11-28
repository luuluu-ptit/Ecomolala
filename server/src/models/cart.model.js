'use strict';

const { model, Schema } = require('mongoose');
const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'Carts';

var cartSchema = new Schema({
    cart_state: {
        type: String, required: true,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'active',
    },
    cart_products: {
        type: Array, required: true, default: [],
        /*
            [
                {
                    productId,
                    shopId,
                    quantity,
                    name,
                    price,
                    product_thumb
                }
            ]
        */
    },
    cart_count_product: { type: Number, default: 0 },
    // cart_userId: { type: String, required: true },
    cart_userId: { type: Schema.Types.ObjectId, ref: 'Shop' },
}, {
    collection: COLLECTION_NAME,
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    }
}
);

// Tạo một middleware để tự động cập nhật giá trị của cart_count_product
cartSchema.pre('save', function (next) {
    // Sử dụng phương thức reduce để tính tổng quantity trong mảng cart_products
    const totalQuantity = this.cart_products.reduce((acc, product) => {
        return acc + (product.quantity || 0);
    }, 0);

    this.cart_count_product = totalQuantity;
    next();
});




module.exports = model(DOCUMENT_NAME, cartSchema);