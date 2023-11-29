'use strict';

const express = require('express');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../middleware/authUtils');
const CommentController = require('../../controllers/comment.controller');
const router = express.Router();

router.get('', asyncHandler(CommentController.getCommentsByParentComment));


//authentication - middeleware
router.use(authentication);
router.post('', asyncHandler(CommentController.createComment));



// check permission
// router.use(authPermissions(["USER"]));

module.exports = router;