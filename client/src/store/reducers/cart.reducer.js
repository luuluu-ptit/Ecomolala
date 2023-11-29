import {
    GET_PRODUCT_LIST_CART,
    ADD_PRODUCT_LIST_CART,
    UPDATE_QUANITY_PRODUCT_LIST_CART,
    DELETE_PRODUCT_LIST_CART
} from "../../constants/actionTypes.constants";
const initialState = {
    cart_products: [],
    cart_count_product: 0
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST_CART:
            return { ...state, cart_products: action.payload.cart_products, cart_count_product: action.payload.cart_count_product };
        case ADD_PRODUCT_LIST_CART:
            return { ...state, cart_products: action.payload.cart_products, cart_count_product: action.payload.cart_count_product };
        case UPDATE_QUANITY_PRODUCT_LIST_CART:
            return { ...state, cart_products: action.payload.cart_products, cart_count_product: action.payload.cart_count_product };
        case DELETE_PRODUCT_LIST_CART:
            return {
                ...state,
                cart_products: state.cart_products.filter((todo) => todo.productId !== action.payload)
            };
        default:
            return state;
    }
};

