'use strict';

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../middleware/authUtils');
const router = express.Router();

//signup
router.post('/shop/signup', asyncHandler(AccessController.signUp));
//login
router.post('/shop/login', asyncHandler(AccessController.login));

router.get('/shop/forgotPassword', asyncHandler(AccessController.forgotPassword));
router.post('/shop/resetPassword/:token', asyncHandler(AccessController.resetPassword));


//authentication
router.use(authentication);
router.post('/shop/convertRoleUsertoSeller', asyncHandler(AccessController.convertRoleUsertoSeller));
router.post('/shop/cancellationOfSales', asyncHandler(AccessController.cancellationOfSales));

router.post('/shop/changePassword', asyncHandler(AccessController.changePassword));
// router.post('/shop/addLikedProduct/:id', asyncHandler(AccessController.addLikedProduct));

////////////////////
router.post('/shop/logout', asyncHandler(AccessController.logout));
router.post('/shop/handlerRefreshToken', asyncHandler(AccessController.handlerRefreshToken));


module.exports = router;
