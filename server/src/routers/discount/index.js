'use strict';

const express = require('express');
const DiscountController = require('../../controllers/discount.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const { authPermissions } = require('../../auth/authPermission');
const router = express.Router();

//authentication - middeleware
router.use(authentication);

//get amount a discount
router.post('/amount', asyncHandler(DiscountController.getDiscountAmount));
router.get('/list_product_code', asyncHandler(DiscountController.getAllDiscountWithProduct));
router.patch('', asyncHandler(DiscountController.cancelDiscount));

//authentication - middeleware
// router.use(authentication);

// check permission
router.use(authPermissions(["SHOP"]));

router.post('', asyncHandler(DiscountController.createDiscount));
router.patch('/:discount_id', asyncHandler(DiscountController.updateDiscountService));
router.get('', asyncHandler(DiscountController.getAllDiscountByShop));
router.delete('', asyncHandler(DiscountController.deleteDiscount));


module.exports = router;