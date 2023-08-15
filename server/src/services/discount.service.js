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
const { findAllDiscountUnselect, checkDiscountExists } = require("../models/repositories/discount.repo");
const { findAllProducts } = require("../models/repositories/product.repo");
const { convertToObjectIdMongoDb } = require("../utils");

class discountService {
    static async createDiscount(payload) {
        const {
            name, description, type, value, maxValue, code, startDate, endDate,
            max_uses, uses_count, users_used, max_uses_per_user,
            min_order_value, shopId, is_active, applies_to, product_ids
        } = payload;

        if (new Date() < new Date(startDate) || new Date() > new Date(endDate)) {
            throw new Error('Cannot create discount');
        }
        if (new Date(endDate) < new Date(startDate)) {
            throw new Error('Cannot create discount');
        }
        const foundDiscount = await discountModel.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongoDb(shopId),
        }).lean();

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new Error('Discount exists');
        }

        const newDiscount = await discountModel.create({
            discount_name: name,
            discount_description: description,
            discount_type: type, //percentage
            discount_value: value,
            discount_max_value: maxValue,
            discount_code: code,
            discount_start_date: new Date(startDate),
            discount_end_date: new Date(endDate),
            discount_max_uses: max_uses, //so luong discount
            discount_uses_count: uses_count,  //so discount da su dung
            discount_users_used: users_used, //ds user da su dung
            discount_max_uses_per_user: max_uses_per_user, //so discount duoc ap dung tren 1 user
            discount_min_order_value: min_order_value || 0, // gia tri don hang nho nhat
            discount_shopId: shopId,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids,
        });

        return newDiscount;
    }

    static async updateDiscountService(discount_id, payload) {
        const {
            name, description, type, value, maxValue, code, startDate, endDate,
            max_uses, max_uses_per_user,
            min_order_value, shopId, is_active, applies_to, product_ids
        } = payload;

        if (new Date() < new Date(startDate) || new Date() > new Date(endDate)) {
            throw new Error('Cannot UpdateCreate discount');
        }
        if (new Date(endDate) < new Date(startDate)) {
            throw new Error('Cannot UpdateCreate discount');
        }
        const foundDiscount = await discountModel.findOne({
            _id: convertToObjectIdMongoDb(discount_id),
            discount_shopId: convertToObjectIdMongoDb(shopId),
        }).lean();

        console.log(foundDiscount, "XXXYYY");
        if (!foundDiscount) {
            throw new Error('Discount not exists');
        }

        const newDiscount = await discountModel.updateOne({
            discount_name: name,
            discount_description: description,
            discount_type: type, //percentage
            discount_value: value,
            discount_max_value: maxValue,
            discount_code: code,
            discount_start_date: new Date(startDate),
            discount_end_date: new Date(endDate),
            discount_max_uses: max_uses, //so luong discount
            discount_max_uses_per_user: max_uses_per_user, //so discount duoc ap dung tren 1 user
            discount_min_order_value: min_order_value || 0, // gia tri don hang nho nhat
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids,
        });

        return newDiscount;
    }

    static async getAllDiscountWithProduct(payload) {
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
            throw new Error('Discount not exists');
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

        return products;
    }

    static async getAllDiscountByShop({ limit, page, shopId }) {
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
        return discounts;
    }

    static async getDiscountAmount({ codeId, userId, shopId, products }) {
        // Apply discount to product;  [USER] ;
        const foundDiscount = await checkDiscountExists({
            model: discountModel,
            filter: {
                discount_code: codeId,
                discount_shopId: convertToObjectIdMongoDb(shopId),
            }
        })
        if (!foundDiscount) {
            throw new Error('Discount not found');
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
            discount_end_date
        } = foundDiscount;

        if (!discount_is_active) throw new Error('Discount expired');
        if (!discount_max_uses) throw new Error('Discount are out');
        if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
            throw new Error('Discount expired');
        }

        let totalOrder = 0;
        if (discount_min_order_value > 0) {
            totalOrder = products.reduce((acc, product) => {
                return acc + (product.quantity * product.price);
            }, 0);
            if (totalOrder < discount_min_order_value) {
                throw new Error(`Discount require a minimum order value of ${discount_min_order_value} `);
            }
        }
        if (discount_max_uses_per_user > 0) {
            const userUsedDiscount = discount_users_used.find(user => user.userId === userId);
            if (userUsedDiscount) {
                discount_max_uses_per_user--;
            }
        }

        //check xem discount nay la fixed_amount or percentage;
        const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100);

        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount,
        }
    }

    static async deleteDiscount({ shopId, codeId }) {
        const deleted = await discountModel.findOneAndDelete({
            discount_code: codeId,
            discount_shopId: convertToObjectIdMongoDb(shopId),
        })

        return deleted;
    }

    static async cancelDiscount({ shopId, codeId, userId }) {
        const foundDiscount = await checkDiscountExists({
            model: discountModel,
            filter: {
                discount_code: codeId,
                discount_shopId: convertToObjectIdMongoDb(shopId),
            }
        });

        if (!foundDiscount) {
            throw new Error('Discount not exists');
        }

        const result = await discountModel.findByIdAndUpdate(foundDiscount._id, {
            $pull: {
                discount_users_used: userId,
            },
            $inc: {
                discount_max_uses: 1,
                discount_uses_count: -1,
            }
        })

        return result;
    }
}


module.exports = discountService;