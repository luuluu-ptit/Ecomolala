'use strict';

const { model, Schema } = require('mongoose');
const DOCUMENT_NAME = 'Comment';
const COLLECTION_NAME = 'Comments';

// Declare the Schema of the Mongo model
var CommentSchema = new Schema({
    comment_productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    comment_userId: { type: Schema.Types.ObjectId, ref: 'Shop' },
    comment_content: { type: String, default: 'text' },
    comment_left: { type: Number, default: 0 },
    comment_right: { type: Number, default: 0 },
    comment_parentId: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME },
    is_Deleted: { type: Boolean, default: false },


}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

module.exports = model(DOCUMENT_NAME, CommentSchema);