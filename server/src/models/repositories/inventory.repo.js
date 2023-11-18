const { inventories } = require('../../models/inventory.model');
const { Types } = require("mongoose");
const { convertToObjectIdMongoDb } = require('../../utils');
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

const reservationInventory = async ({ productId, cartId, quantity }) => {
    const query = {
        inventory_productId: convertToObjectIdMongoDb(productId),
        inventory_stock: { $gte: quantity }
    }, updateInventory = {
        $inc: {
            inventory_stock: -quantity
        },
        $push: {
            inventory_reservation: {
                quantity,
                cartId,
                createOn: new Date()
            }
        }
    }, options = {
        upsert: true, new: true
    }

    return inventories.updateOne(query, updateInventory);
}

module.exports = {
    insertInventory,
    reservationInventory
}