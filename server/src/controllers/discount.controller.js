'use strict';

const discountService = require("../services/discount.service");

class DiscountController {

    //CREATE Discount
    createDiscount = async (req, res, next) => {
        try {
            const result = await discountService.createDiscount({
                ...req.body,
                shopId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Create new Discount successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    //UPDATE Discount
    updateDiscountService = async (req, res, next) => {
        try {
            // console.log("::::xxxx", req.user.userId);
            const result = await discountService.updateDiscountService(req.params.discount_id, {
                ...req.body,
                shopId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Update Discount successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    //get All Discount With Product
    getDiscountAmount = async (req, res, next) => {
        //get Discount Amount (USER)
        try {
            // console.log(req.params, "req.paramsreq.params");
            const result = await discountService.getDiscountAmount({
                ...req.body,
                userId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'get Discount Amount (USER) successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    // getAllDiscountWithProduct
    getAllDiscountWithProduct = async (req, res, next) => {
        try {
            const result = await discountService.getAllDiscountWithProduct({
                ...req.query,
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get All Discount With Product successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    // get All Discount By Shop
    getAllDiscountByShop = async (req, res, next) => {
        try {
            const result = await discountService.getAllDiscountByShop({
                ...req.query,
                shopId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'get All Discount By Shop successfully' : result.message,
                metadata: result.metadata
            });

        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    // delete Discount
    deleteDiscount = async (req, res, next) => {
        try {
            // console.log('XXXXXXXX', req.query);
            const result = await discountService.deleteDiscount({
                shopId: req.user.userId,
                codeId: req.query.codeId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Delete Discount successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    // cancel Discount
    cancelDiscount = async (req, res, next) => {
        try {
            const result = await discountService.cancelDiscount({
                ...req.body,
                userId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Cancel Discount successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

}

module.exports = new DiscountController();