import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";
import productReducer from "./searchProducts.reducer";
import cartReducer from "./cart.reducer";

const rootReducer = combineReducers({
    auth,
    message,
    products: productReducer,
    cartReducer
})

export default rootReducer;
