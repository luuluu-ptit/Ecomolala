import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";
import productReducer from "./searchProducts.reducer";
import cartReducer from "./cart.reducer";
import productsSellerReducer from "./Seller/productManager.reducer";
import setSelectedRowKeys from "./Seller/selectedRowKeys.reducer";

const rootReducer = combineReducers({
    auth,
    message,
    products: productReducer,
    cartReducer,
    productsSellerReducer,
    setSelectedRowKeys
})

export default rootReducer;
