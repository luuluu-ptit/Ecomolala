'use strict';

const discountService = require("../services/discount.service");

class DiscountController {

    //CREATE Discount
    createDiscount = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Create new Discount successfully',
                metadata: await discountService.createDiscount({
                    ...req.body,
                    shopId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    //UPDATE Discount
    updateDiscountService = async (req, res, next) => {
        try {
            // console.log("::::xxxx", req.user.userId);
            return res.status(201).json({
                message: 'Update Discount successfully',
                metadata: await discountService.updateDiscountService(req.params.discount_id, {
                    ...req.body,
                    shopId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    //get All Discount With Product
    getDiscountAmount = async (req, res, next) => {
        //get Discount Amount (USER)
        try {
            // console.log(req.params, "req.paramsreq.params");
            return res.status(200).json({
                message: 'get Discount Amount (USER) successfully',
                metadata: await discountService.getDiscountAmount({
                    ...req.body,
                    userId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // getAllDiscountWithProduct
    getAllDiscountWithProduct = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Get All Discount With Product successfully',
                metadata: await discountService.getAllDiscountWithProduct({
                    ...req.query,
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // get All Discount By Shop
    getAllDiscountByShop = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'get All Discount By Shop successfully',
                metadata: await discountService.getAllDiscountByShop({
                    ...req.query,
                    shopId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // delete Discount
    deleteDiscount = async (req, res, next) => {
        try {
            console.log('XXXXXXXX', req.query);
            return res.status(200).json({
                message: 'Delete Discount successfully',
                metadata: await discountService.deleteDiscount({
                    shopId: req.user.userId,
                    codeId: req.query.codeId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // cancel Discount
    cancelDiscount = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Cancel Discount successfully',
                metadata: await discountService.cancelDiscount({
                    ...req.body,
                    userId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new DiscountController();