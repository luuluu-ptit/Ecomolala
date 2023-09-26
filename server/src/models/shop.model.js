'use strict';

const crypto = require('crypto');

const { model, Schema } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Regular expression for email validation
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false,
    },
    roles: {
        type: Array,
        default: [],
    },
    likedProduct: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    passwordChangedAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
}
);

shopSchema.methods = {
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);