const express = require('express');

const asyncHandler = require('../../helpers/asyncHandler');

const { authentication } = require('../../auth/authUtils');
const { authPermissions } = require('../../auth/authPermission');

const InventoryController = require('../../controllers/inventory.controller');

const router = express.Router();

router.use(authentication);
router.use(authPermissions(["SHOP"]));
router.post('', asyncHandler(InventoryController.addStockToInventory));

module.exports = router;