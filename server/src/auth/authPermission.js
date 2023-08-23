const shopModel = require("../models/shop.model");
const { convertToObjectIdMongoDb, getSelectData } = require("../utils");

const authPermissions = permissions => {
    return async (req, res, next) => {
        try {
            const { userId } = req.user;
            // console.log(userId, "XXX::");
            if (!userId) {
                return res.status(403).json('You need to sign in');
            }
            const user = await shopModel.findById(userId).exec();
            // console.log(user, "XXX::");
            if (!user) {
                return res.status(403).json({
                    message: 'User not found'
                });
            }

            const { roles } = user;
            console.log(roles, "XXX::");
            // if (!permissions.includes(roles)) {
            //     return res.status(401).json('You don not have permission !');
            // }
            if (!roles.some(role => permissions.includes(role))) {
                return res.status(401).json('You don not have permission !');
            }
            return next();

        } catch (error) {
            throw new Error('Throw makes it go boom!')
        }
    }
}

module.exports = {
    authPermissions
};