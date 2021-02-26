import { combineReducers } from 'redux';


import productsReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';




const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer
});


export default rootReducer