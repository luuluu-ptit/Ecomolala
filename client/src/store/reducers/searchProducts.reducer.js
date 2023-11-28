import {
    UPDATE_PRODUCT_LIST
} from "../../constants/actionTypes.constants";
const initialState = {
    products: [],
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PRODUCT_LIST:
            return { ...state, products: action.payload };
        default:
            return state;
    }
};

