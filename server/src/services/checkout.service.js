/*
    tao new order [USER]
    query order [USER]
    cancel order [USER]
    update order status [ADMIN]
*/

/*
    {
        cartId,
        userId,
        shop_order_ids : [
            {
                shopId,
                shop_discount: [],
                item_products :[
                    {
                        productId,
                        price,
                        quantity
                    },
                    ...other
                ]
            },
            {
                shopId,
                shop_discount: [
                    {
                        shopId,
                        discountId,
                        codeId
                    },
                    ...other
                }
                ],
                item_products :[
                    {
                        productId,
                        price,
                        quantity
                    },
                    ...other
                ]
            }
        ]
    }
*/

const orderModel = require("../models/order.model");
const { findCartById } = require("../models/repositories/cart.repo");
const { reservationInventory } = require("../models/repositories/inventory.repo");
const { checkProductsByServer } = require("../models/repositories/product.repo");
const { convertToObjectIdMongoDb } = require("../utils");
const { getDiscountAmount } = require("./discount.service");
const { createLock, deleteLock } = require("./redis.service");

class checkoutService {

    static async checkoutReview({
        cartId,
        userId,
        shop_order_ids = []
    }) {
        try {
            const foundCart = await findCartById(cartId);
            if (!foundCart) {
                return {
                    code: 409,
                    message: "Cart not exists"
                }
            }

            const checkoutOrder = {
                totalPrice: 0,
                feeShip: 0,
                totalDiscount: 0,
                totalCheckout: 0
            }, shopOrderIdsNew = [];

            //tinh tong tien bill
            for (let i = 0; i < shop_order_ids.length; i++) {

                const {
                    shopId,
                    shop_discounts = [],
                    item_products = [],
                } = shop_order_ids[i];

                const checkProductsServer = await checkProductsByServer(item_products);

                shop_order_ids[i].item_products = checkProductsServer;

                if (!checkProductsServer[0]) {
                    return {
                        code: 404,
                        message: "Order wrong"
                    }
                }

                //tong don hang
                const checkoutPrice = checkProductsServer.reduce((acc, product) => {
                    return acc + (product.quantity * product.price)
                }, 0)

                checkoutOrder.totalPrice += checkoutPrice;

                const item_checkout = {
                    shopId,
                    shop_discounts,
                    priceRaw: checkoutPrice,
                    priceApllyDiscount: checkoutPrice,
                    item_products: checkProductsServer
                }

                if (shop_discounts.length > 0) {
                    // console.log("amountrXxx::000");

                    const resultmetadata = await getDiscountAmount({
                        codeId: shop_discounts[0].codeId,
                        userId,
                        shopId,
                        products: checkProductsServer
                    })
                    const { discount = 0, totalPrice = 0, totalOrder = 0 } = resultmetadata.metadata;

                    checkoutOrder.totalDiscount += discount

                    if (discount > 0) {
                        item_checkout.priceApllyDiscount = checkoutPrice - discount
                    }

                    // const foundDiscount = await findDiscountByCodeId({
                    //     codeId: shop_discounts[0].codeId,
                    //     discountId: shop_discounts[0].discountId,
                    //     shopId
                    // })
                }

                checkoutOrder.totalCheckout += item_checkout.priceApllyDiscount
                shopOrderIdsNew.push(item_checkout);
            }
            return {
                code: 200,
                metadata: {
                    shop_order_ids,
                    shopOrderIdsNew,
                    checkoutOrder
                }
            }
        } catch (error) {
            throw error;
        }
    }

    static async orderByUser({
        shop_order_ids,
        cartId,
        userId,
        userAddress = {},
        userPayment = {},
    }) {
        try {
            const { metadata } = await checkoutService.checkoutReview({
                cartId,
                userId,
                shop_order_ids
            });
            const { shopOrderIdsNew, checkoutOrder } = metadata;
            // console.log(shopOrderIdsNew, "shopOrderIdsNew", checkoutOrder, 'checkoutOrder');

            const products = await shopOrderIdsNew.flatMap(order => order.item_products);

            // const createKeyLockProduct = [];
            let reservation = {};

            for (let i = 0; i < products.length; i++) {
                const { productId, quantity } = products[i];

                // const keyLock = await createLock(productId, quantity, cartId);
                // createKeyLockProduct.push(keyLock ? true : false);
                // if (keyLock) {
                //     await deleteLock(keyLock);
                // }
                reservation = await reservationInventory({
                    productId, quantity, cartId
                })
            }

            //neu co 1 sp het hang
            // if (createKeyLockProduct.includes(false)) {
            //     return {
            //         code: 409,
            //         message: "Mot so san pham da het hang, vui long quay lai gio hang..."
            //     }
            // }

            if (reservation.ok === 0) {
                return {
                    code: 409,
                    message: "Mot so san pham da het hang, vui long quay lai gio hang..."
                }
            }

            const newOrder = await orderModel.create({
                order_userId: userId,
                order_checkout: checkoutOrder,
                order_shipping: userAddress,
                order_payment: userPayment,
                order_products: shopOrderIdsNew
            })

            // if (newOrder) {
            //     //remove product from cart
            // }

            return {
                code: 200,
                metadata: newOrder
            }
        } catch (error) {
            throw error;
        }
    }

    static async getOrdersByUser(userId) {
        // laasy tong don hang hien co
        try {
            const orders = await orderModel.find({ order_userId: userId });
            if (!orders) {
                return {
                    code: 409,
                    message: "Orders not found"
                }
            }
            return {
                code: 200,
                metadata: orders
            }
        } catch (error) {
            throw error;
        }
    }

    static async getOneOrderByUser({ orderId, userId }) {
        // lay chi tiet 1 order
        try {
            const order = await orderModel.findOne({
                _id: convertToObjectIdMongoDb(orderId),
                order_userId: userId
            });
            if (!order) {
                return {
                    code: 409,
                    message: "Order not found"
                }
            }
            return {
                code: 200,
                metadata: order
            }
        } catch (error) {
            throw error;
        }
    }

    static async cancelOrderByUser({ orderId, userId }) {
        // huy don hang hien co
        try {
            const order = await orderModel.findOneAndUpdate({
                _id: convertToObjectIdMongoDb(orderId),
                order_userId: userId
            }, { order_status: 'canceled' }, { new: true });

            if (!order) {
                return {
                    code: 409,
                    message: "Cancel order failed"
                }
            }
            return {
                code: 200,
                metadata: order
            }
        } catch (error) {
            throw error;
        }
    }

    // static async updateOrderStatus() {
    // admin or shop update order status
    // }
}

module.exports = checkoutService;