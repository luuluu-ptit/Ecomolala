'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //access token
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2d',
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d',
        })
        console.log(refreshToken, "refreshToken")

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

module.exports = {
    createTokenPair,
}