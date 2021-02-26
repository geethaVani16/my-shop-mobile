import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART, } from "../actions/cartAction";
import { ADD_ORDER } from "../actions/orderAction";

const initialState = {
    items: {},
    totalAmount: 0
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const { price, title } = addedProduct
            let cartItem;
            if (state.items[addedProduct.id]) {
                //already item is present in cart
                cartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    price,
                    title,
                    state.items[addedProduct.id].sum + price
                )

            } else {
                cartItem = new CartItem(1, price, title, price)
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: cartItem },
                totalAmount: state.totalAmount + price
            }
        case REMOVE_FROM_CART:
            const selectedcartItem = state.items[action.payload];
            const currentQty = selectedcartItem.quantity;
            let updatedcartItems;
            if (currentQty > 1) {
                //need to reduce item by 1
                const updatedcartItem = new CartItem(
                    selectedcartItem.quantity - 1,
                    selectedcartItem.productPrice,
                    selectedcartItem.productTitle,
                    selectedcartItem.sum - selectedcartItem.productPrice
                )
                updatedcartItems = { ...state.items, [action.payload]: updatedcartItem }
            } else {
                updatedcartItems = { ...state.items }
                delete updatedcartItems[action.payload]
            }

            return {
                ...state,
                items: updatedcartItems,
                totalAmount: state.totalAmount - selectedcartItem.productPrice
            }
        case ADD_ORDER:
            return initialState;



    }
    return state;

}