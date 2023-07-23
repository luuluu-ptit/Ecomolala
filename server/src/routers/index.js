'use strict';

const express = require('express');
const { apiKey, permissions } = require('../auth/checkAuth');
const router = express.Router();

//check API version
router.use(apiKey);

// check permissions
router.use(permissions('0000'));

router.use('/api/v1', require('./access/index'));
module.exports = router;
