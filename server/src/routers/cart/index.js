'use strict';

const express = require('express');
const CartController = require('../../controllers/cart.controller');
const asyncHandler = require('../../helpers/asyncHandler');
// const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.post('', asyncHandler(CartController.addProductToCart));
router.post('/update', asyncHandler(CartController.updateProductQuantity));
router.delete('', asyncHandler(CartController.deletItemCart));
router.get('', asyncHandler(CartController.getListCart));
// router.patch('/:discount_id', asyncHandler(CartController.deleteCart));


module.exports = router;