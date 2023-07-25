'use strict';

const express = require('express');
const ProductController = require('../../controllers/product.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

//authentication
router.use(authentication);

////////////////////
router.post('', asyncHandler(ProductController.createProduct));
router.post('/publish/:id', asyncHandler(ProductController.publishProductByShop));

//Query
router.get('/drafts/all', asyncHandler(ProductController.getAllDraftsForShop));
router.get('/published/all', asyncHandler(ProductController.getAllPublishForShop));

module.exports = router;
