'use strict';

const AccessService = require("../services/access.service");

class AccessController {

    handlerRefreshToken = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Created token pair successfully',
                metadata: await AccessService.handlerRefreshToken({
                    keyStore: req.keyStore,
                    user: req.user,
                    refreshToken: req.refreshToken,
                })
            })

            // return res.status(201).json({
            //     message: 'Created token pair successfully',
            //     metadata: await AccessService.handlerRefreshToken(req.body.refreshToken)
            // })
        } catch (error) {
            next(error);
        }
    }

    logout = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Logout successfully',
                metadata: await AccessService.logout(req.keyStore)
            })
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        try {
            // console.log(`[P]::login::`, req.body);
            return res.status(201).json({
                message: 'Login successfully',
                metadata: await AccessService.login(req.body)
            })
        } catch (error) {
            next(error);
        }
    }

    signUp = async (req, res, next) => {
        try {
            // console.log(`[P]::signUp::`, req.body);
            return res.status(201).json({
                message: 'Register successfully',
                metadata: await AccessService.signUp(req.body)
            })
        } catch (error) {
            next(error);
        }
    }

    forgotPassword = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Forgot password successfully',
                metadata: await AccessService.forgotPassword({
                    email: req.query.email
                })
            })
        } catch (error) {
            next(error);
        }
    }

    resetPassword = async (req, res, next) => {
        // console.log('reset password XXXXXXXXXXXXXXXXX');
        try {
            return res.status(201).json({
                message: 'Reset password successfully',
                metadata: await AccessService.resetPassword({
                    password: req.body.password,
                    token: req.params.token
                })
            })
        } catch (error) {
            next(error);
        }
    }

    changePassword = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Change password successfully',
                metadata: await AccessService.changePassword({
                    pairPassword: req.body,
                    deCode: req.user
                })
            })
        } catch (error) {
            next(error);
        }
    }

    convertRoleUsertoSeller = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Convert role user to seller successfully',
                metadata: await AccessService.convertRoleUsertoSeller(req.user)
            })
        } catch (error) {
            next(error);
        }
    }

    cancellationOfSales = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Convert role user to seller successfully',
                metadata: await AccessService.cancellationOfSales(req.user)
            })
        } catch (error) {
            next(error);
        }
    }

    addLikedProduct = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Change password successfully',
                metadata: await AccessService.addLikedProduct({
                    productId: req.params.id,
                    deCode: req.user
                })
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AccessController();