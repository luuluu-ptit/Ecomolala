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

    unPublishProductByShop = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'UnPublish product by Shop successfully',
                metadata: await ProductService.unPublishProductByShop({
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

    //SEARCH PRODUCT (USER)
    getListSearchProduct = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Get list search product successfully',
                metadata: await ProductService.searchProduct({
                    keySearch: req.params
                })
            })
        } catch (error) {
            next(error);
        }
    }

    findAllProducts = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Get all Products product successfully',
                metadata: await ProductService.findAllProducts(req.query)
            })
        } catch (error) {
            next(error);
        }
    }

    findProduct = async (req, res, next) => {
        try {
            return res.status(200).json({
                message: 'Get product successfully',
                metadata: await ProductService.findProduct({
                    product_id: req.params.product_id
                })
            })
        } catch (error) {
            next(error);
        }
    }


}

module.exports = new ProductController();