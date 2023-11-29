'use strict';

const CommentService = require("../services/comment.service");

class CommentController {

    createComment = async (req, res, next) => {
        try {
            console.log(req.body, "req.bodyComment0");
            const result = await CommentService.createComment({
                // ...req.body,
                productId: req.body.productId,
                content: req.body.content,
                parentCommentId: req.body.parentCommentId,
                userId: req.user.userId
            })
            // const result = await CommentService.createComment(req.body)
            console.log(req.body, "req.bodyComment1");
            return res.status(result.code).json({
                message: result.code === 200 ? 'Create a comment successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    getCommentsByParentComment = async (req, res, next) => {
        try {
            console.log(req.query, "req.queryComment0");
            const result = await CommentService.getCommentsByParentComment(req.query)
            console.log(result, "req.result1");
            return res.status(result.code).json({
                message: result.code === 200 ? 'Get comments by Parent Comment successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

}
module.exports = new CommentController();