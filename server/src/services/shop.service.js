const shopModel = require('../models/shop.model');
const { product: productModel } = require('../models/products.model');

class shopService {
    // api like product list
    static addLikedProduct = async ({ productId, deCode }) => {
        try {
            const { userId } = deCode;
            const user = await shopModel.findById(userId);
            const product = await productModel.findById(productId);
            console.log("addLikedProductXXX1")

            if (!user) {
                return {
                    code: 409,
                    message: 'User not found'
                }
            }

            if (user.likedProduct.includes(productId)) {
                return {
                    code: 409,
                    message: 'Product already liked'
                }
            }

            if (product.product_shop == userId) {
                return {
                    code: 409,
                    message: 'Sản phẩm này thuộc cửa hàng của bạn'
                }
            }

            if (product.isPublished == false && product.isDraft == true) {
                return {
                    code: 409,
                    message: 'Có thể sản phẩm chưa được công khai'
                }
            }

            user.likedProduct.push(productId);
            await user.save();
            return {
                code: 200,
                metadata: user
            }

        } catch (error) {
            throw error;
        }
    };

    static getLikedProducts = async ({ deCode }) => {
        try {
            const { userId } = deCode;
            // const user = await shopModel.findById(userId);
            const user = await shopModel.findById(userId).populate('likedProduct');
            if (!user) {
                return {
                    code: 404,
                    message: 'User not found'
                }
            }

            // Populate the likedProduct field to get the product details
            // await user.populate('likedProduct').execPopulate();

            return {
                code: 200,
                metadata: user.likedProduct
            }

        } catch (error) {
            throw error;
        }
    };

    // Update information access of user
    static updateInformationAccessOfUser = async (payload) => {
        // console.log('updateInformationAccessOfUser', payload);
        try {
            const { name, email, userId } = payload;
            const userMail = await shopModel.findOne({ email }).lean();
            if (userMail) {
                return {
                    code: 409,
                    message: 'Email already in use',
                }
            }

            const user = await shopModel.findById(userId);
            if (!user) {
                return {
                    code: 409,
                    message: 'Shop not found',
                }
            }

            if (name && name === user.name) {
                return {
                    code: 409,
                    message: 'Name already in use',
                }
            }

            const newUser = await user.updateOne({
                name: name,
                email: email
            });

            return {
                code: 200,
                metadata: newUser
            };

        } catch (error) {
            throw error;
        }
    }

}


module.exports = shopService;