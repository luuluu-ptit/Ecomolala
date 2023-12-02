import {
    GET_PRODUCTS_LIST_OF_SELLER
} from "../../../constants/actionTypes.constants";

// import APIService from "../../api/index.js"

const productsSeller = (products) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCTS_LIST_OF_SELLER,
            payload: products,
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
    productsSeller
}