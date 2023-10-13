'use strict';

const ProductService = require("../services/product.service");

class ProductController {

    //CREATE PRODUCT
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

    //UPDATE PRODUCT
    updateProduct = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Update product successfully',
                metadata: await ProductService.updateProduct(req.body.product_type, req.params.productId, {
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
            const result = await ProductService.publishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id,
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Publish product by Shop successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    unPublishProductByShop = async (req, res, next) => {
        try {
            const result = await ProductService.unPublishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id,
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'UnPublish product by Shop successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    //QUERY
    getAllDraftsForShop = async (req, res, next) => {
        try {
            const result = await ProductService.findAllDraftsForShop({
                product_shop: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get list draft product successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    getAllPublishForShop = async (req, res, next) => {
        try {
            const result = await ProductService.findAllPublishForShop({
                product_shop: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get list publish product successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    //SEARCH PRODUCT (USER)
    getListSearchProduct = async (req, res, next) => {
        try {
            // console.log(req.params, "req.paramsreq.params");
            const result = await ProductService.searchProduct({
                keySearch: req.params
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get list search product successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    findAllProducts = async (req, res, next) => {
        try {
            const result = await ProductService.findAllProducts(req.query)
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get all Products product successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    findProduct = async (req, res, next) => {
        try {
            const result = await ProductService.findProduct({
                product_id: req.params.product_id
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get product successfully' : result.message,
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

module.exports = new ProductController();