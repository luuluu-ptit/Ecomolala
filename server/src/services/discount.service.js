/*
    create a new discount [SHOP | ADMIN], update the discount[?]
    get discount amount;  [USER] 
    get all discount codes ;[USER | SHOP] // 
    verify discount code; [USER]
    delete discount code;[SHOP | ADMIN]
    cancel discount code;[USER]
    lấy tất cả discount phù hợp với product,
    bấm discount -> lấy ra sản phẩm được áp dung discount; (get all discount with product)
*/
const discountModel = require("../models/discount.model");
const { product } = require("../models/products.model");
const { findAllDiscountUnselect, checkDiscountExists } = require("../models/repositories/discount.repo");
const { findAllProducts, checkProductsByServer } = require("../models/repositories/product.repo");
const { convertToObjectIdMongoDb } = require("../utils");

class discountService {
    static async createDiscount(payload) {
        try {
            const {
                name, description, type, value, maxValue, code, startDate, endDate,
                max_uses, uses_count, users_used, max_uses_per_user,
                min_order_value, shopId, is_active, applies_to, product_ids
            } = payload;

            if (new Date() < new Date(startDate) || new Date() > new Date(endDate)) {
                return {
                    code: 409,
                    message: "Cannot create discount"
                }
            }
            if (new Date(endDate) < new Date(startDate)) {
                return {
                    code: 409,
                    message: "Cannot create discount"
                }
            }
            const foundDiscount = await discountModel.findOne({
                discount_code: code,
                discount_shopId: convertToObjectIdMongoDb(shopId),
            }).lean();

            if (foundDiscount && foundDiscount.discount_is_active) {
                return {
                    code: 409,
                    message: "Discount exists"
                }
            }

            let discount_product_ids = [];

            if (applies_to === 'all') {
                // Get all products of the shop
                const shopProducts = await product.find({
                    product_shop: convertToObjectIdMongoDb(shopId),
                    isDraft: false,
                    isPublished: true
                });
                discount_product_ids = shopProducts.map(pro => pro._id);
            } else {
                discount_product_ids = product_ids;
            }

            const newDiscount = await discountModel.create({
                discount_name: name,
                discount_description: description,
                discount_type: type,
                discount_value: value,
                discount_max_value: maxValue,
                discount_code: code,
                discount_start_date: new Date(startDate),
                discount_end_date: new Date(endDate),
                discount_max_uses: max_uses,
                discount_uses_count: uses_count,
                discount_users_used: users_used,
                discount_max_uses_per_user: max_uses_per_user,
                discount_min_order_value: min_order_value || 0,
                discount_shopId: shopId,
                discount_is_active: is_active,
                discount_applies_to: applies_to,
                discount_product_ids: discount_product_ids,
            });

            if (!newDiscount) {
                return {
                    code: 409,
                    message: 'new discount does not exist'
                }
            }

            return {
                code: 200,
                metadata: newDiscount
            };
        } catch (error) {
            throw error;
        }
    }

    static async updateDiscountService(discount_id, payload) {
        try {
            const {
                name, description, type, value, maxValue, code, startDate, endDate,
                max_uses, max_uses_per_user,
                min_order_value, shopId, is_active, applies_to, product_ids
            } = payload;

            if (new Date() < new Date(startDate) || new Date() > new Date(endDate)) {
                return {
                    code: 409,
                    message: "Cannot UpdateCreate discount"
                }

            }
            if (new Date(endDate) < new Date(startDate)) {
                return {
                    code: 409,
                    message: "Cannot UpdateCreate discount"
                }
            }
            const foundDiscount = await discountModel.findOne({
                _id: convertToObjectIdMongoDb(discount_id),
                discount_shopId: convertToObjectIdMongoDb(shopId),
            });

            // console.log(foundDiscount, "XXXYYY");
            if (!foundDiscount) {
                return {
                    code: 409,
                    message: "Discount not exists"
                }
            }

            let discount_product_ids = [];

            if (applies_to === "all") {
                // Get all products of the shop
                const shopProducts = await product.find({
                    product_shop: convertToObjectIdMongoDb(shopId),
                    isDraft: false,
                    isPublished: true
                });
                discount_product_ids = shopProducts.map(pro => pro._id);
                // console.log(discount_product_ids, "discount_product_idsXXXX");
            } else {
                discount_product_ids = product_ids;
            }

            const newDiscount = await foundDiscount.updateOne({
                discount_name: name,
                discount_description: description,
                discount_type: type,
                discount_value: value,
                discount_max_value: maxValue,
                discount_code: code,
                discount_start_date: new Date(startDate),
                discount_end_date: new Date(endDate),
                discount_max_uses: max_uses,
                discount_max_uses_per_user: max_uses_per_user,
                discount_min_order_value: min_order_value || 0,
                discount_is_active: is_active,
                discount_applies_to: applies_to,
                discount_product_ids: discount_product_ids,
            });

            if (!newDiscount) {
                return {
                    code: 409,
                    message: 'new discount does not exist'
                }
            }

            return {
                code: 200,
                metadata: newDiscount
            };
        } catch (error) {
            throw error;
        }
    }

    static async getAllDiscountWithProduct(payload) {
        try {
            //lấy những sp thuộc discount này
            const {
                code, shopId, userId, limit, page
            } = payload;

            const foundDiscount = await discountModel.findOne({
                discount_code: code,
                discount_shopId: convertToObjectIdMongoDb(shopId),
            }).lean();
            // console.log("::::foundDiscount::::", foundDiscount);

            if (!foundDiscount && !foundDiscount.discount_is_active) {
                return {
                    code: 409,
                    message: "Discount not exists"
                }
            }

            let products;
            if (foundDiscount.discount_applies_to === "all") {
                //get all products from one shop with discount
                products = await findAllProducts({
                    limit: +limit,
                    sort: 'ctime',
                    page: +page,
                    filter: {
                        product_shop: convertToObjectIdMongoDb(shopId),
                        isPublished: true,
                    },
                    select: ["product_name"]
                });
            }
            if (foundDiscount.discount_applies_to === "special") {
                //get products id from one shop with discount
                products = await findAllProducts({
                    limit: +limit,
                    sort: 'ctime',
                    page: +page,
                    filter: {
                        _id: { $in: foundDiscount.discount_product_ids },
                        isPublished: true,
                    },
                    select: ["product_name"]
                });
            }

            return {
                code: 200,
                metadata: products
            };
        } catch (error) {
            throw error;
        }
    }

    static async getAllDiscountByShop({ limit, page, shopId }) {
        try {
            //get list discount by shopId;
            const discounts = await findAllDiscountUnselect({
                limit: +limit,
                page: +page,
                filter: {
                    discount_shopId: convertToObjectIdMongoDb(shopId),
                    discount_is_active: true,
                },
                unselect: ['__v', 'discount_shopId'],
                model: discountModel
            })
            if (!discounts) {
                return {
                    code: 409,
                    message: 'get All Discount By Shop Failed'
                }
            }
            return {
                code: 200,
                metadata: discounts
            };
        } catch (error) {
            throw error;
        }
    }

    static async getDiscountAmount({ codeId, userId, shopId, products }) {
        try {
            const checkProductsServer = await checkProductsByServer(products);
            // console.log(checkProductsServer, "Xbox")
            // Apply discount to product;  [USER] ;
            const foundDiscount = await checkDiscountExists({
                model: discountModel,
                filter: {
                    discount_code: codeId,
                    discount_shopId: convertToObjectIdMongoDb(shopId),
                }
            })
            if (!foundDiscount) {
                return {
                    code: 409,
                    message: "Discount not exists"
                }
            }

            const {
                discount_is_active,
                discount_max_uses,
                discount_min_order_value,
                discount_max_uses_per_user,
                discount_users_used,
                discount_type,
                discount_value,
                discount_start_date,
                discount_end_date,
                discount_product_ids,
                discount_max_value,
                discount_shopId
            } = foundDiscount;
            // console.log("foundDiscountXXXX::", discount_max_value);

            if (!discount_is_active) {
                return {
                    code: 409,
                    message: "Discount expired"
                }
            }
            if (!discount_max_uses) {
                return {
                    code: 409,
                    message: "Discount are out"
                }
            }
            if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
                return {
                    code: 409,
                    message: "Discount expired"
                }
            }

            let totalOrder = 0;
            let amount = 0;

            if (discount_min_order_value > 0) {
                totalOrder = await checkProductsServer.reduce(async (acc, product) => {
                    if (discount_product_ids.includes(product.productId)) {
                        const amountTpm = discount_type === 'fixed_amount' ? discount_value : ((product.quantity * product.price) * (discount_value / 100));
                        amount += amountTpm;
                    }
                    return await acc + (product.quantity * product.price);
                }, 0)

                console.log("totalOrderXX::", totalOrder);

                if (totalOrder < discount_min_order_value) {
                    return {
                        code: 409,
                        message: `Discount require a minimum order value of ${discount_min_order_value} `
                    }
                }

                if (amount > discount_max_value) {
                    // console.log("amountrXxx::5", discount_max_value, "XXX", amount);
                    // return {
                    //     code: 409,
                    //     message: `Discount maximum value exceeded is ${discount_max_value}`
                    // }
                    amount = discount_max_value;
                }
            }

            if (discount_max_uses_per_user > 0) {
                const userUsedDiscount = discount_users_used.find(user => user.userId === userId);
                if (userUsedDiscount) {
                    discount_max_uses_per_user--;
                }
            }

            //check xem discount nay la fixed_amount or percentage;
            // const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100);

            return {
                code: 200,
                metadata: {
                    totalOrder,
                    discount: amount,
                    totalPrice: totalOrder - amount,
                }
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteDiscount({ shopId, codeId }) {
        try {
            const deleted = await discountModel.findOneAndDelete({
                discount_code: codeId,
                discount_shopId: convertToObjectIdMongoDb(shopId),
            })
            if (!deleted) {
                return {
                    code: 409,
                    message: 'Discount not exists'
                }
            }
            return {
                code: 200,
                metadata: deleted
            };
        } catch (error) {
            throw error;
        }
    }

    static async cancelDiscount({ shopId, codeId, userId }) {
        try {
            const foundDiscount = await checkDiscountExists({
                model: discountModel,
                filter: {
                    discount_code: codeId,
                    discount_shopId: convertToObjectIdMongoDb(shopId),
                }
            });

            if (!foundDiscount) {
                return {
                    code: 409,
                    message: `Discount not exists `
                }
            }

            const result = await discountModel.findByIdAndUpdate(foundDiscount._id, {
                $pull: {
                    discount_users_used: userId,
                },
                $inc: {
                    discount_max_uses: 1,
                    discount_uses_count: -1,
                },
                // $set: {
                //     discount_max_uses: Math.min(Math.max(0, 100), foundDiscount.discount_max_uses + 1),
                //     discount_uses_count: Math.min(Math.max(0, 100), foundDiscount.discount_uses_count - 1),
                // },
            })

            // console.log("resultXXXX:::", result);

            return {
                code: 200,
                metadata: result
            };
        } catch (error) {
            throw error;
        }
    }
}


module.exports = discountService;