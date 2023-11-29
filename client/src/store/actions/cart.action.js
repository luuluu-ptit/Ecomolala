import {
    GET_PRODUCT_LIST_CART,
    ADD_PRODUCT_LIST_CART,
    UPDATE_QUANITY_PRODUCT_LIST_CART,
    DELETE_PRODUCT_LIST_CART
} from "../../constants/actionTypes.constants";

// import APIService from "../../api/index.js"

const getProductListCart = (cart) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_LIST_CART,
            payload: cart,
        });

        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response && error.response.data &&
                error.response.data.metadata &&
                error.response.data.metadata.message) ||
            error.message ||
            error.toString();
        return Promise.reject(error);
    }
}

const addProductListCart = (cart) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_PRODUCT_LIST_CART,
            payload: cart,
        });

        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response && error.response.data &&
                error.response.data.metadata &&
                error.response.data.metadata.message) ||
            error.message ||
            error.toString();
        return Promise.reject(error);
    }
}

const updateProductListCart = (cart) => async (dispatch) => {
    try {
        // const updatedCartProducts = shop_order_ids.flatMap(shop =>
        //     shop.item_products.map(product => ({
        //         ...product,
        //         quantity: product.quantity, // replace with new quantity
        //     }))
        // );

        dispatch({
            type: UPDATE_QUANITY_PRODUCT_LIST_CART,
            payload: cart,
        });

        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response && error.response.data &&
                error.response.data.metadata &&
                error.response.data.metadata.message) ||
            error.message ||
            error.toString();
        return Promise.reject(error);
    }
}


const deletItemCart = (productId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_LIST_CART,
            payload: productId
        });

        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response && error.response.data &&
                error.response.data.metadata &&
                error.response.data.metadata.message) ||
            error.message ||
            error.toString();
        return Promise.reject(error);
    }
}


export default {
    getProductListCart,
    addProductListCart,
    updateProductListCart,
    deletItemCart
}