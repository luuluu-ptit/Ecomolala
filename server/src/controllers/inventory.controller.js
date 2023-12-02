const { addStockToInventory } = require("../services/inventory.service")


class InventoryController {
    static addStockToInventory = async (req, res, next) => {
        try {
            const result = await addStockToInventory({
                stock: req.body.stock,
                productId: req.body.productId,
                shopId: req.user.userId
            })
            return res.status(result.code).json({
                message: result.code === 200 ? "add stock to inventory successfully" : result.message,
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

module.exports = InventoryController