'use strict'

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const shopModel = require('../models/shop.model');
const { getInfoData } = require('../utils');
const { findByEmail } = require('./shop.service');
const { removeKeyById } = require('./keyToken.service');

const RoleShop = {
    SHOP: 'SHOP',
    WITTER: 'WITTER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static logout = async (keyStore) => {
        try {
            const delKey = await removeKeyById(keyStore._id);
            console.log('delKey', delKey);
            return delKey;
        } catch (error) {
            throw error;
        }
    }

    static login = async ({ email, password, refreshToken = null }) => {
        /*
        1. check email in db
        2. match password
        3.create token pair and save to db
        4.generate token
        5.get data return login
        */
        try {
            const foundShop = await findByEmail({ email });
            if (!foundShop) {
                return {
                    code: 'xxxxxx',
                    message: 'Shop not registered'
                }
            }

            const match = bcrypt.compare(password, foundShop.password);
            if (!match) {
                return {
                    code: 'xxxxxx',
                    message: 'Authenticated error'
                }
            }

            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            const { _id: userId } = foundShop
            const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)
            // console.log(`Created token success`, tokens);

            await KeyTokenService.createKeyToken({
                userId,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken
            });

            return {
                shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: foundShop }),
                tokens
            }
        } catch (error) {
            throw error
        }
    }

    static signUp = async ({ name, email, password }) => {
        try {
            //step 1: check email exist
            const holderShop = await shopModel.findOne({ email }).lean();

            if (holderShop) {
                return {
                    code: 'xxxxxx',
                    message: 'Shop already registered'
                }
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, password: hashPassword, roles: [RoleShop.SHOP]
            })

            if (newShop) {
                //create private key and public key
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // });

                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                console.log({ privateKey, publicKey });

                //save collection key 
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });
                // console.log('publicKeyString: ', publicKeyString);

                if (!keyStore) {
                    return {
                        code: 'xxxxxx',
                        message: 'keyStore error'
                    }
                }

                // const publicKeyObject = crypto.createPublicKey(publicKeyString);

                //created tokens pair
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
                // console.log(`Created token success`, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxxxxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;