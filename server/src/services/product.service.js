const { product, clothing, electronics } = require('../models/products.model');

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
}

class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_quantity, product_type, product_shop, product_attributes,
    }) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    //create product
    async createProduct() {
        return await product.create(this);
    }
}

class Clothing extends Product {
    //create product
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes);
        if (!newClothing) throw new Error('Cannot create');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new Error('Cannot create');

        return newProduct;
    }
}

class Electronic extends Product {
    //create product
    async createProduct() {
        const newElectronic = await electronics.create(this.product_attributes);
        if (!newElectronic) throw new Error('Cannot create');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new Error('Cannot create');

        return newProduct;
    }
}

module.exports = ProductFactory;
