import { combineReducers } from "redux";
import cartReducer from "./Cart/CartReducer";

const rootReducer = combineReducers({
    cartState: cartReducer
})

export default rootReducer;