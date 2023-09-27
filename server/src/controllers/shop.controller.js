'use strict';

const shopService = require("../services/shop.service");

class ShopController {

    addLikedProduct = async (req, res, next) => {
        try {
            return res.status(201).json({
                message: 'Change password successfully',
                metadata: await shopService.addLikedProduct({
                    productId: req.params.id,
                    deCode: req.user
                })
            })
        } catch (error) {
            next(error);
        }
    }

    updateInformationAccessOfUser = async (req, res, next) => {
        console.log(`[P]::updateInformationAccessOfUser::`, req.body);
        try {
            return res.status(201).json({
                message: 'Update information access of user successfully',
                metadata: await shopService.updateInformationAccessOfUser({
                    ...req.body,
                    userId: req.user.userId
                })
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ShopController();