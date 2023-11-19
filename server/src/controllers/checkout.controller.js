'use strict';

const checkoutService = require("../services/checkout.service");

class CheckoutController {

    checkoutReview = async (req, res, next) => {

        try {
            const result = await checkoutService.checkoutReview({
                cartId: req.body.cartId,
                shop_order_ids: req.body.shop_order_ids,
                userId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Checkout review successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    orderByUser = async (req, res, next) => {

        try {
            const result = await checkoutService.orderByUser({
                userId: req.user.userId,
                shop_order_ids: req.body.shop_order_ids,
                cartId: req.body.cartId,
                userAddress: req.body.userAddress,
                userPayment: req.body.userPayment,
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Order by User successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    getOrdersByUser = async (req, res, next) => {

        try {
            const result = await checkoutService.getOrdersByUser(req.user.userId)
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get Orders by User successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    getOneOrderByUser = async (req, res, next) => {

        try {
            const result = await checkoutService.getOneOrderByUser({
                userId: req.user.userId,
                orderId: req.params.orderId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get one order by User successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    cancelOrderByUser = async (req, res, next) => {

        try {
            const result = await checkoutService.orderByUser({
                userId: req.user.userId,
                orderId: req.params.orderId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Cancel order by User successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    orderByUser = async (req, res, next) => {

        try {
            const result = await checkoutService.orderByUser({
                userId: req.user.userId,
                shop_order_ids: req.body.shop_order_ids,
                cartId: req.body.cartId,
                userAddress: req.body.userAddress,
                userPayment: req.body.userPayment,
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Order by User successfully' : result.message,
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

module.exports = new CheckoutController();