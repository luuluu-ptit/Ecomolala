/*
    + add product to cart [USER]
    + reduce product quantity by one [USER]
    + increase product quantity by one [USER]
    + get list to cart [USER]
    + delete item cart [USER]
*/

const cart = require("../models/cart.model");
const { getProductById, checkProductByServer } = require("../models/repositories/product.repo");

class cartService {

    static async createUserCart({ userId, product }) {
        try {
            const query = {
                cart_userId: userId,
                cart_state: 'active',
            }, updateOrInsert = {
                $addToSet: {
                    cart_products: product
                },
                $inc: {
                    cart_count_product: product.quantity
                }
            }, options = { upsert: true, new: true }

            // return await cart.findOneAndUpdate(query, updateOrInsert, options);
            return {
                code: 200,
                metadata: await cart.findOneAndUpdate(query, updateOrInsert, options)
            }
        } catch (error) {
            throw error;
        }
    }

    static async updateUserCartquantity({ userId, product }) {
        try {
            // console.log("checkProductServerXXXX1")
            const { productId, quantity } = product;
            // console.log("checkProductServerXXXX2")

            const query = {
                cart_userId: userId,
                'cart_products.productId': productId,
                cart_state: 'active',
            }, updateSet = {
                $inc: {
                    'cart_products.$.quantity': quantity,
                    cart_count_product: quantity
                }
            }, options = { upsert: true, new: true }

            const newProduct = await cart.findOneAndUpdate(query, updateSet, options);

            return {
                code: 200,
                metadata: newProduct
            }
        } catch (error) {
            throw error;
        }
    }

    // add product to cart [USER]
    static async addProductToCart({ userId, product = {} }) {
        try {
            const checkProductServer = await checkProductByServer(product);
            // console.log("checkProductServerXXXX", checkProductServer.productId);

            //check cart ton tai khong ?
            const userCart = await cart.findOne({
                cart_userId: userId,
            });

            if (!userCart) {
                //create new cart for user
                return await cartService.createUserCart({ userId, product: checkProductServer });
            }

            // neu ton tai cart nhung cart rong 
            if (!userCart.cart_products.length) {
                userCart.cart_products = [checkProductServer];
                userCart.cart_count_product += checkProductServer.quantity;
                return {
                    code: 200,
                    metadata: await userCart.save()
                }
            }

            //neu ton tai cart va co sp nay thi update quantity
            // return await cartService.updateUserCartquantity({ userId, product });
            // Check if the product already exists in the cart
            const existingProduct = userCart.cart_products.find(
                (cartProduct) => cartProduct.productId === checkProductServer.productId
            );
            // console.log(existingProduct, "existingProduct");

            if (existingProduct) {
                // If the product already exists, update the quantity
                return await cartService.updateUserCartquantity({ userId, product: checkProductServer });
            } else {
                // If the product does not exist, add it to the cart
                userCart.cart_products.push(checkProductServer);
                return {
                    code: 200,
                    metadata: await userCart.save(),
                };
            }
        } catch (error) {
            throw error;
        }
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
        try {
            const { productId, quantity, old_quantity } = shop_order_ids[0]?.item_products[0];
            //check product
            const foundProduct = await getProductById(productId);
            if (!foundProduct) {
                return {
                    code: 409,
                    message: `Product ${productId} not found`
                }
            }
            //compare
            if (foundProduct.product_shop.toString() != shop_order_ids[0]?.shopId) {
                return {
                    code: 409,
                    message: `Product do not belong to the shop`
                }
            }

            // if ((quantity) <= 0) {
            //     //delete product
            //     return await cartService.deletItemCart({ userId, productId })
            // }

            if ((quantity) <= 0) {
                //delete product
                // return await cartService.deletItemCart({ userId, productId })
                const deleteCart = await cartService.deletItemCart({ userId, productId })

                if (deleteCart.code === 200) {
                    const updatedCart = await cartService.getListCart({ userId });
                    return {
                        code: 200,
                        metadata: updatedCart
                    };
                }
            }

            const updatedProduct = await cartService.updateUserCartquantity({
                userId,
                product: {
                    productId,
                    quantity: quantity - old_quantity,
                }
            })

            // After updating the product quantity, fetch the updated cart
            // const updatedCart = await cartService.getListCart({ userId });

            return {
                code: 200,
                metadata: updatedProduct
                // metadata: updatedCart
            };
        } catch (error) {
            throw error;
        }
    }

    // delete item cart [USER]
    static async deletItemCart({ userId, productId }) {
        try {
            const removeIt = { productId: productId };
            const query = {
                cart_userId: userId,
                cart_state: 'active',
            }, updateSet = {
                $pull: {
                    cart_products: removeIt
                }
            };
            const deletItemCart = await cart.updateOne(query, updateSet);
            // return {
            //     code: 200,
            //     metadata: deletItemCart
            // };

            if (deletItemCart.modifiedCount === 0) {
                // Không có sản phẩm nào được xoá
                return {
                    code: 404,
                    message: 'No item found to delete'
                };
            } else {
                // Một sản phẩm đã được xoá
                return {
                    code: 200,
                    metadata: deletItemCart
                };
            }
        } catch (error) {
            throw error;
        }
    }

    // get list cart [USER]
    static async getListCart({ userId }) {
        try {
            console.log("cart", "cart");
            const cartXX = await cart.findOne({
                cart_userId: userId
            }).lean();
            if (!cartXX) {
                return {
                    code: 409,
                    message: "cart not exist",
                }
            }
            console.log(cartXX, "cart");
            return {
                code: 200,
                metadata: cartXX
            }
        } catch (error) {
            throw error;
        }
    }
}


module.exports = cartService;