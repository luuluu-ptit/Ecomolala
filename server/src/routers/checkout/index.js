'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../middleware/authUtils');
// const { authPermissions } = require('../../middleware/authPermission');
const checkoutController = require('../../controllers/checkout.controller');

const router = express.Router();

//authentication - middeleware
router.use(authentication);

//Checkout review
router.post('/review', asyncHandler(checkoutController.checkoutReview));
router.post('/orderByUser', asyncHandler(checkoutController.orderByUser));

router.get('/getOrders', asyncHandler(checkoutController.getOrdersByUser));
router.get('/order', asyncHandler(checkoutController.getOneOrderByUser));
router.patch('/cancelOrder', asyncHandler(checkoutController.CancelOrderByUser));


// check permission
// router.use(authPermissions(["SHOP","ADMIN"]));
// router.post('/updateStatusOrder', asyncHandler(checkoutController.updateOrderStatus));


module.exports = router;