import PRODUCTS from '../../data/dummy-data';


const intialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export default (state = intialState, action) => {
    return state
}