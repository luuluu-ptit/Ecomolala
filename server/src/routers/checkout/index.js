'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
// const { authPermissions } = require('../../auth/authPermission');
const checkoutController = require('../../controllers/checkout.controller');

const router = express.Router();

//authentication - middeleware
router.use(authentication);

//Checkout review
router.post('/review', asyncHandler(checkoutController.checkoutReview));
router.post('/orderByUser', asyncHandler(checkoutController.orderByUser));


// check permission
// router.use(authPermissions(["SHOP"]));


module.exports = router;