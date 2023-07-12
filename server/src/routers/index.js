'use strict';

const express = require('express');
const router = express.Router();

router.use('/api/v1', require('./auth/index'));
module.exports = router;