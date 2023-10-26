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

const { findCartById } = require("../models/repositories/cart.repo");
const { checkProductsByServer } = require("../models/repositories/product.repo");
const { getDiscountAmount } = require("./discount.service");

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

    // static async checkoutReview(){

    // }
}

module.exports = checkoutService;