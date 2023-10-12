'use strict';

const AccessService = require("../services/access.service");

class AccessController {

    handlerRefreshToken = async (req, res, next) => {

        try {
            const result = await AccessService.handlerRefreshToken({
                keyStore: req.keyStore,
                user: req.user,
                refreshToken: req.refreshToken,
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Created token pair successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    logout = async (req, res, next) => {
        try {
            const result = await AccessService.logout(req.keyStore)
            return res.status(result.code).json({
                message: !result.code === 200 ? 'Logout fail' : result.message,
                metadata: result.metadata
            })
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    login = async (req, res, next) => {

        try {
            const result = await AccessService.login(req.body)
            return res.status(result.code).json({
                message: result.code === 200 ? 'Login Successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    signUp = async (req, res, next) => {
        console.log(`[P]::signUp::`, req.body);
        try {
            const result = await AccessService.signUp(req.body)
            return res.status(result.code).json({
                message: result.code === 200 ? 'Register successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    changePassword = async (req, res, next) => {

        try {
            const result = await AccessService.changePassword({
                pairPassword: req.body,
                deCode: req.user
            })
            return res.status(result.code).json({
                message: result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    forgotPassword = async (req, res, next) => {
        try {
            const result = await AccessService.forgotPassword({
                email: req.query.email
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Forgot password successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    resetPassword = async (req, res, next) => {
        // console.log('reset password XXXXXXXXXXXXXXXXX');
        try {
            const result = await AccessService.resetPassword({
                password: req.body.password,
                token: req.params.token
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Reset password successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    convertRoleUsertoSeller = async (req, res, next) => {

        try {
            const result = await AccessService.convertRoleUsertoSeller(req.user)
            return res.status(result.code).json({
                message: result.code === 200 ? 'Convert role user to seller successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

    cancellationOfSales = async (req, res, next) => {

        try {
            const result = await AccessService.cancellationOfSales(req.user)
            return res.status(result.code).json({
                message: result.code === 200 ? 'Cancellation Of Sales Successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                status: error.status
            });
        }
    }

}

module.exports = new AccessController();