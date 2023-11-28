'use strict'

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair, verifyJWT, sendMail } = require('../middleware/authUtils');
const shopModel = require('../models/shop.model');
// const { product: productModel } = require('../models/products.model');
const { getInfoData, removeData } = require('../utils');
// const { findByEmail } = require('./shop.service');
const { findByEmail } = require('../models/repositories/shop.repo');
const { removeKeyById } = require('./keyToken.service');

const RoleShop = {
    SHOP: 'SHOP',
    USER: 'USER',
    ADMIN: 'ADMIN',
    // GUEST: 'GUEST',
}

class AccessService {

    static handlerRefreshToken = async ({ keyStore, user, refreshToken }) => {
        // check token used
        const { userId, email } = user;
        try {
            if (keyStore.refreshTokensUsed.includes(refreshToken)) {
                await KeyTokenService.deleteKeyById(userId);
                return {
                    code: 409,
                    message: 'Something wrong! Pls relogin to continute...'
                }
            }

            if (keyStore.refreshToken !== refreshToken) {
                return {
                    code: 409,
                    message: 'Shop not registed'
                }
            }

            //check userId
            const foundShop = findByEmail(email);
            if (!foundShop) {
                return {
                    code: 409,
                    message: 'Shop not registed 2'
                }
            }

            const tokens = await createTokenPair({ userId, email }, keyStore.publicKey, keyStore.privateKey);

            //update 
            await keyStore.updateOne({
                $set: {
                    refreshToken: tokens.refreshToken
                },
                $addToSet: {
                    refreshTokensUsed: refreshToken // da dc su dung de lay token moi
                }
            });

            return {
                code: 200,
                metadata: {
                    user,
                    tokens
                }
            }

        } catch (error) {
            throw error;
        }
    }

    // static handlerRefreshToken = async (refreshToken) => {
    //     // check token used
    //     try {
    //         const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken);
    //         if (foundToken) {
    //             //decode user
    //             const { userId, email } = await verifyJWT(refreshToken, foundToken.privateKey);
    //             console.log({ userId, email });

    //             //del
    //             await KeyTokenService.deleteKeyById(userId);

    //             return {
    //                 code: 409,
    //                 message: 'Something wrong! Pls relogin to continute...'
    //             }
    //         }

    //         //NO
    //         const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    //         console.log(holderToken, 'holderToken');
    //         if (!holderToken) {
    //             return {
    //                 code: 409,
    //                 message: 'Shop not registed'
    //             }
    //         }

    //         //verify
    //         const { userId, email } = await verifyJWT(refreshToken, holderToken.privateKey);

    //         //check userId
    //         const foundShop = findByEmail(email);
    //         if (!foundShop) {
    //             return {
    //                 code: 409,
    //                 message: 'Shop not registed'
    //             }
    //         }

    //         const tokens = await createTokenPair({ userId, email }, holderToken.publicKey, holderToken.privateKey);

    //         //update 
    //         await holderToken.updateOne({
    //             $set: {
    //                 refreshToken: tokens.refreshToken
    //             },
    //             $addToSet: {
    //                 refreshTokensUsed: refreshToken // da dc su dung de lay token moi
    //             }
    //         });

    //         return {
    //             user: { userId, email },
    //             tokens
    //         }

    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static logout = async (keyStore) => {
        console.log('delKeyXXXX1');
        try {
            console.log('delKeyXXXX2');
            const delKey = await removeKeyById(keyStore._id);
            console.log('delKey', delKey);
            return {
                code: 200,
                metadata: delKey,
                message: 'Logout successfully'
            }
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
                    code: 409,
                    message: 'Shop not registered'
                }
            }

            const match = bcrypt.compare(password, foundShop.password);
            if (!match) {
                return {
                    code: 409,
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
                code: 200,
                metadata: {
                    shop: getInfoData({ fileds: ['_id', 'name', 'email', 'roles'], object: foundShop }),
                    tokens
                }
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
                    code: 409,
                    message: 'Shop already registered'
                };
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, password: hashPassword, roles: [RoleShop.USER]
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
                // console.log({ privateKey, publicKey });

                //save collection key 
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });
                // console.log('publicKeyString: ', publicKeyString);

                if (!keyStore) {
                    return {
                        code: 409,
                        message: 'keyStore not found'
                    };
                }

                // const publicKeyObject = crypto.createPublicKey(publicKeyString);

                //created tokens pair
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
                // console.log(`Created token success`, tokens);

                return {
                    code: 200,
                    metadata: {
                        shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
                        tokens
                    }
                }
            }
            return {
                code: 403,
                message: 'signUp failed'
            }

        } catch (error) {
            throw (error);
        }
    }

    static changePassword = async ({ pairPassword, deCode }) => {
        try {
            const { oldPassword, newPassword } = pairPassword
            // console.log(oldPassword, "XXXXX");
            const { userId } = deCode;
            const user = await shopModel.findById(userId);
            // console.log("XXXXXXXXX:", user);
            if (user && (await bcrypt.compare(oldPassword, user.password))) {
                // const salt = await bcrypt.genSalt(10);
                // const hashPassword = await bcrypt.hash(newPassword, salt);
                const hashPassword = await bcrypt.hash(newPassword, 10);
                // console.log(typeof hashPassword, "typeof");
                user.password = hashPassword;
                await user.save();
                return {
                    code: 201,
                    message: 'Password changed'
                }
            } else {
                return {
                    code: 409,
                    message: 'Invalid old password'
                }
            }
        } catch (error) {
            throw (error);
        }
    };

    /*
    forgot password 
    // Client gửi email
    // Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
    // Client check mail => click link
    // Client gửi api kèm token
    // Check token có giống với token mà server gửi mail hay không
    // Change password 
    */
    static forgotPassword = async ({ email }) => {
        try {
            if (!email) {
                return {
                    code: 'XXXXX',
                    message: "Missing email"
                }
            }
            // const user = await findByEmail({ email });
            const user = await shopModel.findOne({ email })
            // console.log("XXXX", user);
            if (!user) {
                return {
                    code: 'XXXXX',
                    message: "User not found"
                }
            }
            const resetToken = user.createPasswordChangedToken();
            await user.save();

            const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/v1/shop/resetPassword/${resetToken}>Click here</a>`

            const data = {
                email,
                html,
            }
            const rs = await sendMail(data);

            // return {
            //     rs,
            //     resetToken
            // };
            return {
                code: 200,
                metadata: {
                    rs,
                    resetToken
                }
            }
        } catch (error) {
            throw (error);
        }
    }

    static resetPassword = async ({ password, token }) => {
        // console.log('reset password XXXXXXXXXXXXXXXXX');
        try {
            if (!password || !token) {
                return {
                    code: 409,
                    message: "Missing imputs"
                }
            }
            const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
            const user = await shopModel.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
            if (!user) {
                return {
                    code: 409,
                    message: "Invalid reset token"
                }
            }
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
            user.passwordResetToken = undefined;
            user.passwordChangedAt = Date.now();
            user.passwordResetExpires = undefined;
            await user.save();

            // return user;
            return {
                code: 200,
                metadata: {
                    user
                }
            }

        } catch (error) {
            throw (error);
        }
    }

    //convertRoleUsertoSeller
    static convertRoleUsertoSeller = async ({ userId }) => {
        try {
            const user = await shopModel.findById(userId);
            if (!user) {
                return {
                    code: 409,
                    message: 'User not found'
                }
            }
            if (user.roles.includes(RoleShop.SHOP) && !user.roles.includes(RoleShop.ADMIN)) {
                return {
                    code: 409,
                    message: 'User is already a seller'
                }
            }

            user.roles.push(RoleShop.SHOP);
            user.verify = true;
            user.status = 'active';
            await user.save();

            // return user;
            return {
                code: 200,
                metadata: {
                    user
                }
            }
        } catch (error) {
            throw (error);
        }
    }

    static cancellationOfSales = async ({ userId }) => {
        try {
            const user = await shopModel.findById(userId);
            if (!user) {
                return {
                    code: 409,
                    message: 'User not found'
                }
            }
            if (!user.roles.includes(RoleShop.SHOP) && !user.roles.includes(RoleShop.ADMIN)) {
                return {
                    code: 409,
                    message: 'User is not yet a seller'
                }
            }

            // removeData(user.roles, RoleShop.SHOP);
            const newRoles = user.roles.filter(role => role !== RoleShop.SHOP);
            user.roles = newRoles;
            user.verify = false;
            user.status = 'inactive';
            await user.save();

            // return user;
            return {
                code: 200,
                metadata: {
                    user
                }
            }
        } catch (error) {
            throw (error);
        }
    }


}

module.exports = AccessService;