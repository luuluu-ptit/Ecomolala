'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const shopController = require('../../controllers/shop.controller');
const router = express.Router();


//authentication
router.use(authentication);

router.post('/shop/addLikedProduct/:id', asyncHandler(shopController.addLikedProduct));
router.get('/shop/getLikedProducts', asyncHandler(shopController.getLikedProducts));
router.patch('/shop/updateInformationAccessOfUser', asyncHandler(shopController.updateInformationAccessOfUser));

module.exports = router;
