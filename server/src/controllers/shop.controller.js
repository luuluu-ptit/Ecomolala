'use strict';

const shopService = require("../services/shop.service");

class ShopController {

    addLikedProduct = async (req, res, next) => {

        try {
            const result = await shopService.addLikedProduct({
                productId: req.params.id,
                deCode: req.user
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'add Liked Product successfully' : result.message,
                metadata: result
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    getLikedProducts = async (req, res, next) => {

        try {
            const result = await shopService.getLikedProducts({
                deCode: req.user
            });

            return res.status(result.code).json({
                message: result.code === 200 ? 'Retrieved liked products successfully' : result.message,
                metadata: result.metadata
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }

    };

    updateInformationAccessOfUser = async (req, res, next) => {
        // console.log(`[P]::updateInformationAccessOfUser::`, req.body);
        try {
            const result = await shopService.updateInformationAccessOfUser({
                ...req.body,
                userId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? 'Update information access of user successfully' : result.message,
                metadata: result.metadata
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }
}

module.exports = new ShopController();