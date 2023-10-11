import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";

const rootReducer = combineReducers({
    auth,
    message,
})

export default rootReducer;
