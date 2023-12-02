import {
    GET_PRODUCTS_LIST_OF_SELLER
} from "../../../constants/actionTypes.constants"
const initialState = {
    products: [],
};

export default function productsSellerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_LIST_OF_SELLER:
            return { ...state, products: action.payload };
        default:
            return state;
    }
};

