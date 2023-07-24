'use strict';

const express = require('express');
const authController = require('../../controllers/access.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

//signup
router.post('/shop/signup', asyncHandler(authController.signUp));
//login
router.post('/shop/login', asyncHandler(authController.login));

//authentication
router.use(authentication);

////////////////////
router.post('/shop/logout', asyncHandler(authController.logout));
router.post('/shop/handlerRefreshToken', asyncHandler(authController.handlerRefreshToken));


module.exports = router;
