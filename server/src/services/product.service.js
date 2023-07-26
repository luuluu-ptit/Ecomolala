const { product, clothing, electronics } = require('../models/products.model');
const { findAllDraftsForShop, findAllPublishForShop, publishProductByShop, unPublishProductByShop, searchProductByUser } = require('../models/repositories/product.repo');
class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case 'Clothing':
                return new Clothing(payload).createProduct();
            case 'Electronics':
                return new Electronic(payload).createProduct();

            default:
                throw new Error(`Unknown type ${type}`);
        }
    }

    static async publishProductByShop({ product_shop, product_id }) {
        return await publishProductByShop({ product_shop, product_id })
    }

    static async unPublishProductByShop({ product_shop, product_id }) {
        return await unPublishProductByShop({ product_shop, product_id })
    }

    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true };
        return await findAllDraftsForShop({ query, limit, skip })
    }

    static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true };
        return await findAllPublishForShop({ query, limit, skip })
    }

    static async searchProduct({keySearch}) {
        return await searchProductByUser({keySearch})
    }


}

class Product {
    constructor({
        product_name, product_thumb, product_description,
        product_price, product_quantity, product_ratingsAverage, product_variations,
        product_type, product_shop, product_attributes, isDraft, isPublished
    }) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        // this.product_slug = product_slug;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_ratingsAverage = product_ratingsAverage;
        this.product_variations = product_variations;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
        this.isDraft = isDraft;
        this.isPublished = isPublished;
    }

    //create product
    async createProduct(product_id) {
        return await product.create({ ...this, _id: product_id });
    }
}

class Clothing extends Product {
    //create product
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newClothing) throw new Error('Cannot create');

        const newProduct = await super.createProduct(newClothing._id);
        if (!newProduct) throw new Error('Cannot create');

        return newProduct;
    }
}

class Electronic extends Product {
    //create product
    async createProduct() {
        const newElectronic = await electronics.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newElectronic) throw new Error('Cannot create');

        const newProduct = await super.createProduct(newElectronic._id);
        if (!newProduct) throw new Error('Cannot create');

        return newProduct;
    }
}

module.exports = ProductFactory;
