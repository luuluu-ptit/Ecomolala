'use strict';

const checkoutService = require("../services/checkout.service");

class CheckoutController {

    checkoutReview = async (req, res, next) => {

        try {
            const result = await checkoutService.checkoutReview(req.body)
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

}

module.exports = new CheckoutController();