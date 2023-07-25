'use strict';

const ProductService = require("../services/product.service");

class ProductController {

    createProduct = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Create new product successfully',
                metadata: await ProductService.createProduct(req.body.product_type, req.body)
            })
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ProductController();