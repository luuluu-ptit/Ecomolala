'use strict';

const AccessService = require("../services/access.service");

class AuthController {

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

module.exports = new AuthController();