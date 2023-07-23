'use strict'

const { Types } = require("mongoose");
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // const publicKeyString = publicKey.toString();
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            //     // publicKey: publicKeyString
            // })
            // return tokens ? tokens.publicKey : null;

            const filter = { user: userId }, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, option = { upsert: true, new: true };
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, option);
            return tokens ? tokens.publicKey : null;

        } catch (error) {
            return error;
        }
    }

    static findByUserId = async (userId) => {
        // return await keytokenModel.findOne({ user: Types.ObjectId(userId) }).lean();
        const result = await keytokenModel.findOne({ user: new Types.ObjectId(userId) }).lean();
        // console.log('result:', result);
        return result;
    }

    static removeKeyById = async (id) => {
        try {
            const filter = { _id: new Types.ObjectId(id) };
            const result = await keytokenModel.deleteOne(filter);
            // console.log('result: ', result);
            return result;
        } catch (error) {
            return error;
        }
        // return await keytokenModel.remove(id);
    }
}

module.exports = KeyTokenService;