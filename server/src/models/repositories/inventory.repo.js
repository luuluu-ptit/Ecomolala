const { inventories } = require('../../models/inventory.model');
const { Types } = require("mongoose");
// const { getSelectData, unGetSelectData, convertToObjectIdMongoDb } = require('../../utils');

const insertInventory = async ({ productId, shopId, stock, location = "Unknow" }) => {
    // try {
    //     const newInventories = await inventories.create({
    //         inventory_productId: productId,
    //         inventory_shopId: shopId,
    //         inventory_stock: stock,
    //         inventory_location: location
    //     });
    //     console.log("XXXXXnewInventories:", newInventories);
    //     return newInventories;
    // } catch (error) {
    //     console.log("Error while insert inventory:", error);
    //     throw error;
    // }
    const newInventories = await inventories.create({
        inventory_productId: productId,
        inventory_shopId: shopId,
        inventory_stock: stock,
        inventory_location: location
    });
    // console.log("XXXXXnewInventories:", newInventories);
    return newInventories;
}

module.exports = {
    insertInventory,
}