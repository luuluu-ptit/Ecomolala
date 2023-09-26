const { product, clothing, electronics } = require('../models/products.model');
const { insertInventory } = require('../models/repositories/inventory.repo');
const { findAllDraftsForShop, findAllPublishForShop, publishProductByShop, unPublishProductByShop, searchProductByUser, findAllProducts, findProduct, updateProductById_repo } = require('../models/repositories/product.repo');
const { removeUndefinedObject, updateNestedObjectParser, convertToObjectIdMongoDb } = require('../utils');
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

    static async updateProduct(type, productId, payload) {
        switch (type) {
            case 'Clothing':
                return new Clothing(payload).updateProduct(productId);
            case 'Electronics':
                return new Electronic(payload).updateProduct(productId);

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

    static async searchProduct({ keySearch }) {
        return await searchProductByUser({ keySearch })
    }

    static async findAllProducts({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({
            limit, sort, page, filter,
            select: ['product_name', 'product_price', 'product_thumb', 'product_shop']
        })
        // const findAllProducts1 = await findAllProducts({
        //     limit, sort, page, filter,
        //     select: ['product_name', 'product_price', 'product_thumb']
        // });
        // console.log("findAllProducts:::::::", findAllProducts1);
        // return findAllProducts1;
    }

    static async findProduct({ product_id }) {
        return await findProduct({ product_id, unselect: ['__v'] });
    }

    // static async getProductByCategory({ 
    //     limit = 50, 
    //     sort = 'ctime', 
    //     page = 1, 
    //     filter = { isPublished: true, product_type : productType } 
    // }){
    //     return await getProductByCategory({
    //         limit, sort, page, filter,
    //         select: ['product_name', 'product_price', 'product_thumb', 'product_shop']
    //     })
    // }
}

class Product {
    constructor({
        product_name, product_thumb, product_description,
        product_price, product_quantity, product_ratingsAverage, product_variations,
        product_type, product_attributes, isDraft, isPublished, product_shop
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
        const newProduct = await product.create({ ...this, _id: product_id });
        if (newProduct) {
            //add product_stock to inventory
            await insertInventory({
                productId: newProduct._id,
                shopId: this.product_shop,
                stock: this.product_quantity
            })
        }
        return newProduct;
    }

    //update product
    async updateProduct(productId, bodyUpdate) {
        // console.log('ssssssssssssssssssssssssssssssssssss1');
        return await updateProductById_repo({ productId, bodyUpdate, model: product });
        // return await product.findByIdAndUpdate(productId, bodyUpdate, {
        //     new: true
        // });
    }
}

class Clothing extends Product {
    //create product
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newClothing) throw new Error('Cannot create Clothing product');

        const newProduct = await super.createProduct(newClothing._id);
        if (!newProduct) throw new Error('Cannot create Clothing product');

        return newProduct;
    }

    async updateProduct(productId) {
        //1. remove attribute has null and undefined
        //2. check xem update o dau ?
        const objectParams = removeUndefinedObject(this)

        if (objectParams.product_attributes) {
            await updateProductById_repo({
                productId,
                bodyUpdate: updateNestedObjectParser(objectParams.product_attributes),
                model: clothing
            });
        }
        const updateProduct = await super.updateProduct(
            productId,
            updateNestedObjectParser(objectParams)
        );
        // console.log('ssssssssssssssssssssssssssssssssssss2222222');
        console.log(updateProduct, 'updateProductxxxxxxxxx');
        return updateProduct;
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

    async updateProduct(productId) {
        //1. remove attribute has null and undefined
        //2. check xem update o dau ?

        const objectParams = removeUndefinedObject(this);

        if (objectParams.product_attributes) {
            //update child
            await updateProductById_repo({ productId, objectParams, model: electronics });
        }
        const updateProduct = await super.updateProduct(productId, objectParams);
        return updateProduct;
    }
}

module.exports = ProductFactory;
