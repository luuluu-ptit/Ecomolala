const { getSelectData, unGetSelectData, convertToObjectIdMongoDb } = require("../../utils");
// const discountModel = require("../discount.model");

const findAllDiscountUnselect = async ({
    limit = 50, sort = 'ctime', page = 1,
    filter, unselect, model
}) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
    const documents = await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(unGetSelectData(unselect))
        .lean()

    // console.log(documents, 'documents');
    return documents;
}

const findAllDiscountSelect = async ({
    limit = 50, sort = 'ctime', page = 1,
    filter, select, model
}) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
    const documents = await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()

    // console.log(documents, 'documents');
    return documents;
}

const checkDiscountExists = async ({ model, filter }) => {
    return await model.findOne(filter).lean();
}

// const findDiscountByCodeId = async ({ codeId, discountId, shopId }) => {
//     return await discountModel.find({
//         discount_code: codeId,
//         _id: convertToObjectIdMongoDb(discountId),
//         discount_shopId: shopId
//     })
// }

module.exports = {
    findAllDiscountUnselect,
    findAllDiscountSelect,
    checkDiscountExists,
    // findDiscountByCodeId
}