'use strict';

const express = require('express');
const ProductController = require('../../controllers/product.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const { authPermissions } = require('../../auth/authPermission');
const router = express.Router();

router.get('/search/:keySearch', asyncHandler(ProductController.getListSearchProduct));
router.get('', asyncHandler(ProductController.findAllProducts));
router.get('/:product_id', asyncHandler(ProductController.findProduct));

//authentication - middeleware
router.use(authentication);

// check permission
router.use(authPermissions(["SHOP"]));

router.post('', asyncHandler(ProductController.createProduct));
router.patch('/:productId', asyncHandler(ProductController.updateProduct));
router.post('/publish/:id', asyncHandler(ProductController.publishProductByShop));
router.post('/unpublish/:id', asyncHandler(ProductController.unPublishProductByShop));

//Query
router.get('/drafts/all', asyncHandler(ProductController.getAllDraftsForShop));
router.get('/published/all', asyncHandler(ProductController.getAllPublishForShop));

module.exports = router;
