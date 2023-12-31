'use strict';

const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { findByUserId } = require('../services/keyToken.service');
// const KeyTokenService = require('../services/keyToken.service');
const nodemailer = require('nodemailer');

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
            expiresIn: '15d',
        })
        // console.log(accessToken, "accessToken");

        const refreshToken = await JWT.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '30d',
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

/*
1.Check UserId missing
2.Get access token
3.verify token
4.check user in db
5.check keystore with this userId
6.OK all -> return next()
*/
const authentication = asyncHandler(async (req, res, next) => {
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

const sendMail = async ({ email, html }) => {
    console.log('Sending mail', process.env.EMAIL_NAME)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"SanThuongMaiDienTu-ECOMOLALA" <no-relply@ecomolala.ecommerce.com>', // sender address
        to: email, // list of receivers
        subject: `Forgot password`, // Subject line
        html: html, // html body
    });

    return info
}


module.exports = {
    createTokenPair,
    authentication,
    verifyJWT,
    sendMail
}