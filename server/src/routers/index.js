'use strict';

const express = require('express');
const { apiKey, permissions } = require('../auth/checkAuth');
const router = express.Router();

//check API version
router.use(apiKey);

// check permissions
router.use(permissions('0000'));

router.use('/api/v1/checkout', require('./checkout'));
router.use('/api/v1/discount', require('./discount'));
router.use('/api/v1/cart', require('./cart'));
router.use('/api/v1/product', require('./product'));
router.use('/api/v1/action', require('./shop'));
router.use('/api/v1', require('./access'));
module.exports = router;
