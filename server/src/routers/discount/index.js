'use strict';

const express = require('express');
const DiscountController = require('../../controllers/discount.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

//get amount a discount
router.post('/amount', asyncHandler(DiscountController.getDiscountAmount));
router.get('/list_product_code', asyncHandler(DiscountController.getAllDiscountWithProduct));
router.patch('', asyncHandler(DiscountController.cancelDiscount));

//authentication - middeleware
router.use(authentication);

////////////////////
router.post('', asyncHandler(DiscountController.createDiscount));
router.patch('/:discount_id', asyncHandler(DiscountController.updateDiscountService));
router.get('', asyncHandler(DiscountController.getAllDiscountByShop));
router.delete('', asyncHandler(DiscountController.deleteDiscount));


module.exports = router;