import { combineReducers } from 'redux';


import productsReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import AuthReducer from './reducers/AuthReducer';




const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: AuthReducer
});


export default rootReducer