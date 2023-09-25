const { product, clothing, electronics } = require('../../models/products.model');
const { Types } = require("mongoose");
const { getSelectData, unGetSelectData, convertToObjectIdMongoDb } = require('../../utils');

const findAllDraftsForShop = async ({ query, limit, skip }) => {
    // console.log("::::::::::::::::::::::::1");
    return await queryProduct({ query, limit, skip });
}

const findAllPublishForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip });
}

const searchProductByUser = async ({ keySearch }) => {
    // console.log("keySearch: ", { keySearch })
    try {
        const regexSearch = new RegExp(keySearch.keySearch);
        // console.log('regexSearch: ', regexSearch);
        const results = await product.find({
            isDraft: false,
            $text: { $search: regexSearch }
            // $text: { $search: keySearch }
        }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .lean()

        // console.log('results: ', results);
        return results;
    } catch (error) {
        console.log("Error while searchProductByUser:", error);
        throw error;
    }
}

const publishProductByShop = async ({ product_shop, product_id }) => {
    try {
        const foundProduct = await product.findOne({
            product_shop: convertToObjectIdMongoDb(product_shop),
            _id: convertToObjectIdMongoDb(product_id),
        });
        // console.log(foundProduct, "found::::");
        if (!foundProduct) {
            return null;
        }
        foundProduct.isDraft = false;
        foundProduct.isPublished = true;
        const { modifiedCount } = await foundProduct.updateOne(foundProduct);
        return modifiedCount;
    } catch (error) {
        console.log("Error while publishProductByShop:", error);
        throw error;
    }
}

const unPublishProductByShop = async ({ product_shop, product_id }) => {
    try {
        const foundProduct = await product.findOne({
            product_shop: convertToObjectIdMongoDb(product_shop),
            _id: convertToObjectIdMongoDb(product_id),
        });

        // console.log(foundProduct, "found::::");
        if (!foundProduct) {
            return null;
        }
        foundProduct.isPublished = false;
        foundProduct.isDraft = true;
        const { modifiedCount } = await foundProduct.updateOne(foundProduct);

        return modifiedCount;
    } catch (error) {
        console.log("Error while unPublishProductByShop:", error);
        throw error;
    }
}

const findAllProducts = async ({ limit, sort, page, filter, select }) => {

    try {
        const skip = (page - 1) * limit;
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
        const products = await product.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getSelectData(select))
            .lean();

        // console.log("products:::::", products);
        return products;
    } catch (error) {
        console.log("Error while querying products:", error);
        throw error;
    }
}

const getProductByCategory = async ({ limit, sort, page, filter, select }) => {

    try {
        const skip = (page - 1) * limit;
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
        const products = await product.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(getSelectData(select))
            .lean();

        console.log("products:::::", products);
        return products;
    } catch (error) {
        console.log("Error while querying products:", error);
        throw error;
    }
}

const findProduct = async ({ product_id, unselect }) => {
    const productDetail = await product.findById(product_id).select(unGetSelectData(unselect));
    // console.log("Product detail:", productDetail);
    return productDetail;
}

const updateProductById_repo = async ({ productId, bodyUpdate, model, isNew = true }) => {
    return await model.findByIdAndUpdate(productId, bodyUpdate, {
        new: isNew
    });
}

//findAllDraftsForShop AND findAllPublishForShop
const queryProduct = async ({ query, limit, skip }) => {
    try {
        return await product.find(query).populate('product_shop', 'name email -_id')
            .sort({ updateAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();
    } catch (error) {
        console.log("Error while queryProduct:", error);
        throw error;
    }
}

const getProductById = async (productId) => {
    try {
        return await product.findOne({ _id: convertToObjectIdMongoDb(productId) }).lean();
    } catch (error) {
        console.log("Error while getProductById:", error);
        throw error;
    }
}

module.exports = {
    findAllDraftsForShop,
    findAllPublishForShop,
    publishProductByShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById_repo,
    getProductById
}

// -------------------------------
// const { product, clothing, electronics } = require('../../models/products.model');
// const { Types } = require("mongoose");
// const { getSelectData, unGetSelectData } = require('../../utils');

// const findAllDraftsForShop = async ({ query, limit, skip }) => {
//     return await queryProduct({ query, limit, skip });
// }

// const findAllPublishForShop = async ({ query, limit, skip }) => {
//     return await queryProduct({ query, limit, skip });
// }

// const searchProductByUser = async ({ keySearch }) => {
//     // console.log("keySearch: ", { keySearch: keySearch })
//     const regexSearch = new RegExp(keySearch.keySearch);
//     // console.log('regexSearch: ', regexSearch);
//     const results = await product.findOne({
//         isDraft: false,
//         $text: { $search: regexSearch }
//     }, { score: { $meta: 'textScore' } })
//         .sort({ score: { $meta: 'textScore' } })
//         .lean()

//     // console.log('results: ', results);
//     return results;
// }

// const publishProductByShop = async ({ product_shop, product_id }) => {
//     const foundProduct = await product.findOne({
//         product_shop: new Types.ObjectId(product_shop),
//         _id: new Types.ObjectId(product_id),
//     });
//     console.log(foundProduct, "found::::");
//     if (!foundProduct) {
//         return null;
//     }
//     foundProduct.isDraft = false;
//     foundProduct.isPublished = true;
//     const { modifiedCount } = await foundProduct.updateOne(foundProduct);

//     return modifiedCount;
// }

// const unPublishProductByShop = async ({ product_shop, product_id }) => {
//     const foundProduct = await product.findOne({
//         product_shop: new Types.ObjectId(product_shop),
//         _id: new Types.ObjectId(product_id),
//     });
//     // console.log(foundProduct, "found::::");
//     if (!foundProduct) {
//         return null;
//     }
//     foundProduct.isPublished = false;
//     foundProduct.isDraft = true;
//     const { modifiedCount } = await foundProduct.updateOne(foundProduct);

//     return modifiedCount;
// }

// const findAllProducts = async ({ limit, sort, page, filter, select }) => {
//     const skip = (page - 1) * limit;
//     const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
//     const products = await product.findOne(filter)
//         .sort(sortBy)
//         .skip(skip)
//         .limit(limit)
//         .select(getSelectData(select))
//         .lean()

//     // console.log(products, 'products');
//     return products;
// }

// const findProduct = async ({ product_id, unselect }) => {
//     return await product.findById(product_id).select(unGetSelectData(unselect))
// }

// const updateProductById_repo = async ({ productId, bodyUpdate, model, isNew = true }) => {
//     return await model.findByIdAndUpdate(productId, bodyUpdate, {
//         new: isNew
//     });
// }

// //findAllDraftsForShop AND findAllPublishForShop
// const queryProduct = async ({ query, limit, skip }) => {
//     return await product.find(query).populate('product_shop', 'name email -_id')
//         .sort({ updateAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean()
//         .exec()
// }

// module.exports = {
//     findAllDraftsForShop,
//     findAllPublishForShop,
//     publishProductByShop,
//     unPublishProductByShop,
//     searchProductByUser,
//     findAllProducts,
//     findProduct,
//     updateProductById_repo
// }