'use strict';

const express = require('express');
const { apiKey, permissions } = require('../auth/checkAuth');
const router = express.Router();

//check API version
router.use(apiKey);
router.use(permissions('0000'));

// check permissions

router.use('/api/v1', require('./access/index'));
module.exports = router;