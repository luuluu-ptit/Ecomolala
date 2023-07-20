'use strict'
const bcrypt = require('bcrypt');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const shopModel = require('../models/shop.model');
const crypto = require('crypto');
const { getInfoData } = require('../utils');

const RoleShop = {
    SHOP: 'SHOP',
    WITTER: 'WITTER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {
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
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
                console.log({ privateKey, publicKey });

                //save collection key 

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                });
                // console.log('publicKeyString: ', publicKeyString);


                if (!publicKeyString) {
                    return {
                        code: 'xxxxxx',
                        message: 'publicKeyString error'
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString);

                //created tokens pair
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey)
                console.log(`Created token success`, tokens);

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