/*
+ add comment  [USER , SHOP]
+ get list comment  [USER , SHOP]
+ delete a comment [USER , SHOP]
*/
const Comment = require("../models/comment.model");
const shopModel = require("../models/shop.model");

const { convertToObjectIdMongoDb } = require("../utils");

class CommentService {
    static async createComment({
        productId, userId, content, parentCommentId = null
    }) {
        try {
            const user = await shopModel.findById(userId);
            const comment = new Comment({
                comment_productId: productId,
                comment_userId: userId,
                comment_userName: user.name,
                comment_content: content,
                comment_parentId: parentCommentId
            })

            let rightValue;
            if (parentCommentId) {
                //reply to parent comment
                const parentComment = await Comment.findById(parentCommentId);
                if (!parentComment) {
                    return {
                        code: 409,
                        message: 'parent comment not found'
                    }
                }
                rightValue = parentComment.comment_right

                //update many comments
                await Comment.updateMany({
                    comment_productId: convertToObjectIdMongoDb(productId),
                    comment_right: { $gte: rightValue }
                }, {
                    $inc: { comment_right: 2 }
                })
                await Comment.updateMany({
                    comment_productId: convertToObjectIdMongoDb(productId),
                    comment_left: { $gt: rightValue }
                }, {
                    $inc: { comment_left: 2 }
                })
            } else {
                const maxRightValue = await Comment.findOne({
                    comment_productId: convertToObjectIdMongoDb(productId),
                }, 'comment_right', { sort: { comment_right: -1 } })

                if (maxRightValue) {
                    rightValue = maxRightValue.comment_right + 1
                } else {
                    rightValue = 1
                }
            }

            // insert comment
            comment.comment_left = rightValue;
            comment.comment_right = rightValue + 1;

            await comment.save();
            // return comment;

            // if (!newDiscount) {
            //     return {
            //         code: 409,
            //         message: 'new discount does not exist'
            //     }
            // }

            return {
                code: 200,
                metadata: comment
            };

        } catch (error) {
            throw error;
        }
    }

    static async getCommentsByParentComment({
        productId,
        parentCommentId = null,
        limit = 50,
        offset = 0 //skip
    }) {
        try {
            if (parentCommentId) {
                const parentComment = await Comment.findById(parentCommentId);
                if (!parentComment) {
                    return {
                        code: 409,
                        message: 'Not found comment for product'
                    }
                }

                const comments = await Comment.find({
                    comment_productId: convertToObjectIdMongoDb(productId),
                    comment_left: { $gt: parentComment.comment_left },
                    comment_right: { $lte: parentComment.comment_right }
                }).select({
                    comment_content: 1,
                    comment_left: 1,
                    comment_right: 1,
                    comment_parentId: 1,
                    comment_userName: 1
                }).sort({
                    comment_left: 1,
                })
                return {
                    code: 200,
                    metadata: comments
                };

            }

            const comments = await Comment.find({
                comment_productId: convertToObjectIdMongoDb(productId),
                comment_parentId: parentCommentId
            }).select({
                comment_content: 1,
                comment_left: 1,
                comment_right: 1,
                comment_parentId: 1,
                comment_userName: 1
            }).sort({
                comment_left: 1,
            })
            return {
                code: 200,
                metadata: comments
            };
        } catch (error) {
            throw error;
        }
    }

}


module.exports = CommentService;