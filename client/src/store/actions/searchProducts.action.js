import {
    UPDATE_PRODUCT_LIST
} from "../../constants/actionTypes.constants";

// import APIService from "../../api/index.js"

const searchProductList = (products) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_LIST,
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
    searchProductList
}