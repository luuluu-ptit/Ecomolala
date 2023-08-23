'use strict';

const cartService = require("../services/cart.service");

class CartController {

    //add product to cart [USER]
    addProductToCart = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Create new cart successfully',
                metadata: await cartService.addProductToCart({
                    ...req.body,
                    userId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // reduce product quantity by one [USER]
    // increase product quantity by one [USER]
    updateProductQuantity = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Update Cart successfully',
                metadata: await cartService.updateProductQuantity({
                    ...req.body,
                    userId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // delete item cart [USER]
    deletItemCart = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'delete Cart successfully',
                metadata: await cartService.deletItemCart({
                    ...req.body,
                    userId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // get list cart [USER]
    getListCart = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Get list cart successfully',
                // metadata: await cartService.getListCart(req.query)
                metadata: await cartService.getListCart({
                    userId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // delete cart [USER]
    // deleteCart = async (req, res, next) => {
    //     try {
    //         console.log('XXXXXXXX', req.query);
    //         return res.status(200).json({
    //             message: 'Delete Discount successfully',
    //             metadata: await cartService.deleteDiscount({
    //                 shopId: req.user.userId,
    //                 codeId: req.query.codeId
    //             })
    //         })
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

module.exports = new CartController();