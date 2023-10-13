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

// cartSchema.pre('save', function (next) {
//     // Calculate the total quantity from the cart_products array
//     const totalQuantity = this.cart_products.reduce((total, product) => total + product.quantity, 0);

//     // Update the cart_count_product attribute
//     this.cart_count_product = totalQuantity;

//     next();
// });



module.exports = model(DOCUMENT_NAME, cartSchema);