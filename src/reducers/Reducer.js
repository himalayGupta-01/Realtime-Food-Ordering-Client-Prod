import CategoryReducer from "./Category.reducer"
import { combineReducers } from "redux";
import ProductReducer from "./Product.reducer"
import AuthReducer from "./Auth.reducer";
import UserReducer from "./User.reducer";
import OrderReducer from "./Order.reducer";
import MessageReducer from "./Message.reducer"



const rootReducer=combineReducers({
    auth:AuthReducer,
    user:UserReducer,
    category:CategoryReducer,
    product:ProductReducer,
    order:OrderReducer,
    message:MessageReducer
})


export default rootReducer;