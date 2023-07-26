'use strict';

const express = require('express');
const ProductController = require('../../controllers/product.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.get('/search/:keySearch', asyncHandler(ProductController.getListSearchProduct));
router.get('', asyncHandler(ProductController.findAllProducts));
router.get('/:product_id', asyncHandler(ProductController.findProduct));

//authentication - middeleware
router.use(authentication);

////////////////////
router.post('', asyncHandler(ProductController.createProduct));
router.post('/publish/:id', asyncHandler(ProductController.publishProductByShop));
router.post('/unpublish/:id', asyncHandler(ProductController.unPublishProductByShop));

//Query
router.get('/drafts/all', asyncHandler(ProductController.getAllDraftsForShop));
router.get('/published/all', asyncHandler(ProductController.getAllPublishForShop));

module.exports = router;
