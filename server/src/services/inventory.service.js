const { getProductById } = require('../models/repositories/product.repo');
const { inventories } = require('./../models/inventory.model');

class InventoryService {
    static async addStockToInventory({
        stock,
        productId,
        shopId,
        location = "180 Trieu khuc, Thanh Xuan, Ha Noi"
    }) {
        const product = await getProductById(productId);
        console.log(product, "InventoryService")
        if (!product) {
            return {
                code: 409,
                message: "Product not exists"
            }
        }

        const query = {
            inventory_productId: productId,
            inventory_shopId: shopId,
        },
            updateInventory = {
                $inc: {
                    inventory_stock: stock
                },
                $set: {
                    inventory_location: location
                }
            },
            options = {
                upsert: true,
                new: true
            }

        return {
            code: 200,
            metadata: await inventories.findOneAndUpdate(query, updateInventory, options)
        }
    }
}

module.exports = InventoryService;