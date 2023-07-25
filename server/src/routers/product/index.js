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

//Query
router.get('/drafts/all', asyncHandler(ProductController.getAllDraftsForShop));

module.exports = router;
