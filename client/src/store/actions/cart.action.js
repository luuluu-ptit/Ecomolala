import {
    GET_PRODUCT_LIST_CART
} from "../../constants/actionTypes.constants";

import APIService from "../../api/index.js"

const getProductListCart = (cart) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_LIST_CART,
            payload: cart.cart_products,
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
    getProductListCart
}