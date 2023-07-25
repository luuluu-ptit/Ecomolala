'use strict';

const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { findByUserId } = require('../services/keyToken.service');
// const KeyTokenService = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id',
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //access token
        const accessToken = await JWT.sign(payload, publicKey, {
            // algorithm: 'RS256',
            expiresIn: '2d',
        })
        console.log(accessToken, "accessToken");

        const refreshToken = await JWT.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '7d',
        })
        // console.log(refreshToken, "refreshToken");

        //
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log(`err verify::`, err);
            }
            else {
                console.log(`decode verify::`, decode);
            }
        });

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        return {
            code: "error",
            mess: error.message,
            status: 'error',

        }
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    /*
    1.Check UserId missing
    2.Get access token
    3.verify token
    4.check user in db
    5.check keystore with this userId
    6.OK all -> return next()
    */
    try {
        // console.log('AHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHI2');
        const userId = req.headers[HEADER.CLIENT_ID];
        // console.log('userId: ', userId);
        if (!userId) {
            return {
                code: 'xxxxxx',
                message: 'User does not exist'
            }
        }
        //2
        const keyStore = await findByUserId(userId);
        // console.log(keyStore, 'keyStore');
        if (!keyStore) {
            return {
                code: 'xxxxxx',
                message: 'Not Found Keystore'
            }
        }

        //3
        if (req.headers[HEADER.REFRESHTOKEN]) {
            try {
                const refreshToken = req.headers[HEADER.REFRESHTOKEN];
                const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
                if (decodeUser.userId !== userId) {
                    return {
                        code: 'xxxxxx',
                        message: 'Invalid UserID'
                    }
                }
                req.keyStore = keyStore;
                req.user = decodeUser;
                req.refreshToken = refreshToken;
                return next();
            } catch (error) {
                throw error;
            }
        }

        //3
        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken) {
            return {
                code: 'xxxxxx',
                message: 'Invalid Request'
            }
        }

        try {
            const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
            if (decodeUser.userId !== userId) {
                return {
                    code: 'xxxxxx',
                    message: 'Invalid UserID'
                }
            }
            req.keyStore = keyStore;
            req.user = decodeUser;
            return next();
        } catch (error) {
            throw error;
        }
    } catch (error) {
        throw new Error(error)
    }
})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}