/*
    + add product to cart [USER]
    + reduce product quantity by one [USER]
    + increase product quantity by one [USER]
    + get list to cart [USER]
    + delete cart [USER]
    + delete item cart [USER]
*/

const cart = require("../models/cart.model");
const { getProductById } = require("../models/repositories/product.repo");

class cartService {

    //START REPO CART
    static async createUserCart({ userId, product }) {
        const query = {
            cart_userId: userId,
            cart_state: 'active',
        }, updateOrInsert = {
            $addToSet: {
                cart_products: product
            }
        }, options = { upsert: true, new: true }

        return await cart.findOneAndUpdate(query, updateOrInsert, options);
    } //END REPO CART

    //START UPDATE REPO CART
    static async updateUserCartquantity({ userId, product }) {
        const { productId, quantity } = product;
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: 'active',
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, options = { upsert: true, new: true }

        return await cart.findOneAndUpdate(query, updateSet, options);
    } //END UPDATE REPO CART


    // add product to cart [USER]
    static async addProductToCart({ userId, product = {} }) {
        //check cart ton tai khong ?
        const userCart = await cart.findOne({
            cart_userId: userId,
        });

        if (!userCart) {
            //create new cart for user
            return await cartService.createUserCart({ userId, product });
        }

        // neu ton tai cart nhung cart rong 
        if (!userCart.cart_products.length) {
            userCart.cart_products = [product];
            return await userCart.save();
        }

        //neu ton tai cart va co sp nay thi update quantity
        return await cartService.updateUserCartquantity({ userId, product });
    }

    // reduce product quantity by one [USER]
    // increase product quantity by one [USER]
    static async updateProductQuantity({ userId, shop_order_ids }) {
        /*
            shop_order_ids: [
                {
                    shopId,
                    item_products : [
                        {
                            quantity,
                            price,
                            shopId,
                            old_quantity,
                            productId
                        },
                        ...other
                    ],
                    version
                },
                ...other
            ]
        */
        const { productId, quantity, old_quantity } = shop_order_ids[0]?.item_products[0];
        //check product
        const foundProduct = await getProductById(productId);
        if (!foundProduct) throw new Error(`Product ${productId} not found`);
        //compare
        if (foundProduct.product_shop.toString() != shop_order_ids[0]?.shopId) {
            throw new Error(`Product do not belong to the shop`);
        }
        if (quantity === 0) {
            //delete product
            return await cartService.deletItemCart({ userId, productId })
        }

        return await cartService.updateUserCartquantity({
            userId,
            product: {
                productId,
                quantity: quantity - old_quantity,
            }
        })
    }

    // delete item cart [USER]
    static async deletItemCart({ userId, productId }) {
        const query = {
            cart_userId: userId,
            cart_state: 'active',
        }, updateSet = {
            $pull: {
                cart_products: {
                    productId
                }
            }
        };

        const deletItemCart = await cart.updateOne(query, updateSet);
        return deletItemCart;
    }

    // get list cart [USER]
    static async getListCart({ userId }) {
        return await cart.findOne({
            cart_userId: userId
        }).lean();
    }

    // delete cart [USER]
    // static async deleteCart({ shopId, codeId }) {
    //     const deleted = await discountModel.findOneAndDelete({
    //         discount_code: codeId,
    //         discount_shopId: convertToObjectIdMongoDb(shopId),
    //     })

    //     return deleted;
    // }
}


module.exports = cartService;