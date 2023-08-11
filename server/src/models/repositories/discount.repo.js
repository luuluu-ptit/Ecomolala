const { getSelectData, unGetSelectData } = require("../../utils");

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

module.exports = {
    findAllDiscountUnselect,
    findAllDiscountSelect,
    checkDiscountExists,
}