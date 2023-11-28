import {
    GET_PRODUCT_LIST_CART
} from "../../constants/actionTypes.constants";
const initialState = {
    cart_products: [],
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST_CART:
            return { ...state, cart_products: action.payload };
        default:
            return state;
    }
};

