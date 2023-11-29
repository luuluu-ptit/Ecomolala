'use strict';

const cartService = require("../services/cart.service");

class CartController {

    //add product to cart [USER]
    addProductToCart = async (req, res, next) => {
        try {
            const result = await cartService.addProductToCart({
                ...req.body,
                userId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Add product to cart successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    // reduce product quantity by one [USER]
    // increase product quantity by one [USER]
    updateProductQuantity = async (req, res, next) => {
        try {
            const result = await cartService.updateProductQuantity({
                ...req.body,
                userId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Update Cart successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    // delete item cart [USER]
    deletItemCart = async (req, res, next) => {
        try {
            const result = await cartService.deletItemCart({
                ...req.body,
                // productId: req.params.productId,
                userId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'delete Cart successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    // get list cart [USER]
    getListCart = async (req, res, next) => {
        try {
            const result = await cartService.getListCart({
                userId: req.user.userId
            })
            console.log(result, "result");
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get list cart successfully' : result.message,
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

module.exports = new CartController();