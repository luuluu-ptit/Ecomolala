'use strict';

const ProductService = require("../services/product.service");

class ProductController {

    createProduct = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Create new product successfully',
                metadata: await ProductService.createProduct(req.body.product_type, {
                    ...req.body,
                    product_shop: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    // PUT: publish product
    publishProductByShop = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Publish product by Shop successfully',
                metadata: await ProductService.publishProductByShop({
                    product_shop: req.user.userId,
                    product_id: req.params.id,
                })
            })
        } catch (error) {
            next(error);
        }
    }

    //QUERY
    getAllDraftsForShop = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Get list draft product successfully',
                metadata: await ProductService.findAllDraftsForShop({
                    product_shop: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }

    getAllPublishForShop = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Get list publish product successfully',
                metadata: await ProductService.findAllPublishForShop({
                    product_shop: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }


}

module.exports = new ProductController();