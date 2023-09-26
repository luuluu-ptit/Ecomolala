const shopModel = require('../models/shop.model');
const { product: productModel } = require('../models/products.model');

class shopService {
    // api like product list
    static addLikedProduct = async ({ productId, deCode }) => {
        try {
            const { userId } = deCode;
            const user = await shopModel.findById(userId);
            const product = await productModel.findById(productId);
            if (!user) {
                return {
                    code: 'xxxxxx',
                    message: 'User not found'
                }
            }

            if (user.likedProduct.includes(productId)) {
                return {
                    code: 'xxxxxx',
                    message: 'Product already liked'
                }
            }

            if (product.product_shop == userId) {
                return {
                    code: 'xxxxxx',
                    message: 'Sản phẩm này thuộc cửa hàng của bạn'
                }
            }

            if (product.isPublished == false && product.isDraft == true) {
                return {
                    code: 'xxxxxx',
                    message: 'Có thể sản phẩm chưa được công khai'
                }
            }

            user.likedProduct.push(productId);
            await user.save();
            return {
                code: 'xxxxxx',
                message: 'Product added to liked list'
            }

        } catch (error) {
            return {
                code: 'xxxxxx',
                message: error.message,
                status: 'error'
            }
        }
    };

    // Update information access of user
    static updateInformationAccessOfUser = async (payload) => {
        // console.log('updateInformationAccessOfUser', payload);
        try {
            const { name, email, userId } = payload;
            const userMail = await shopModel.findOne({ email }).lean();
            // console.log(userMail, "userMail - Update Information Access");
            const user = await shopModel.findById(userId);
            if (!user) {
                return {
                    code: 'xxxxxx',
                    message: 'Shop not found',
                }
            }

            if (email && email === userMail.email) {
                return {
                    code: 'xxxxxx',
                    message: 'Email already in use',
                }
            }

            if (name && name === user.name) {
                return {
                    code: 'xxxxxx',
                    message: 'Name already in use',
                }
            }

            const newUser = await user.updateOne({
                name: name,
                email: email
            });

            return newUser;

        } catch (error) {
            throw new Error
        }
    }

}


module.exports = shopService;