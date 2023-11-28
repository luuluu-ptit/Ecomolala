const express = require('express');
const { uploadDisk } = require('../../configs/multer');
const UploadController = require('../../controllers/upload.controller');
const asyncHandler = require('../../helpers/asyncHandler');
// const { authentication } = require('../../middleware/authUtils');
// const { authPermissions } = require('../../middleware/authPermission');

const router = express.Router();

//authentication - middeleware
// router.use(authentication);

// check permission
// router.use(authPermissions(["SHOP"]));

router.post('/product', asyncHandler(UploadController.uploadWithURLcontroller));
router.post('/product/singleImage', uploadDisk.single('file'), asyncHandler(UploadController.uploadSingleIMGcontroller));
router.post('/product/multiImage', uploadDisk.array('files', 5), asyncHandler(UploadController.uploadMultiIMGcontroller));


module.exports = router;
