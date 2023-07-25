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
}

module.exports = new AccessController();