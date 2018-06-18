import { cartConstants } from '../constants';

/**
 * Redux Actions for User
 */
export const cartActions = {
    addMethode,
    addMethod,
    deleteMethode,
    clearBasket,
    getCart,
    getBasket,
    getBasketCount
};

const addToCartUnsafe = methodId => ({
    type: cartConstants.ADD_METHOD,
    methodId
});

const addMethode = methodId => (dispatch, getState) => {
    if (getState().cart.byId[methodId].inventory > 0) {
        dispatch(addToCartUnsafe(methodId));
    }
};
function addMethod(method) {
    return { type: cartConstants.ADD_METHOD, method };
}
function deleteMethode(methode) {
    var cart = localStorage.getItem('cart');
    var idx = cart.indexOf(methode);
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    return { type: cartConstants.DELETE_METHOD, cart };
}

function clearBasket() {
    const cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));
    return { type: cartConstants.CLEAR };
}

function getCart() {
    const cartString = localStorage.getItem('cart');
    console.log('getCart:cartString',cartString);
    if(cartString == '[null]') {
        return dispatch => {
            dispatch({
                type: cartConstants.GET_ALL
            });
        };
    } else {
        const cart = JSON.parse(cartString);
        console.log('getCart',cart);
        //return { type: cartConstants.GET_ALL, cart };
        return dispatch => {
            dispatch({
                type: cartConstants.GET_ALL,
                cart
            });
        };
    }
}

function getBasket() {
    const cartString = localStorage.getItem('cart');
    console.log('cartString',cartString);
    if(cartString == '[null]') {
        return { type: cartConstants.GET_ALL };
    }
    const cart = JSON.parse(cartString);
    console.log('getBasket',cart);
    return { type: cartConstants.GET_ALL, cart };
}

function getBasketCount() {
    let length = 0;
    const cartString = localStorage.getItem('cart');
    if(cartString == '[null]') {
        return dispatch => {
            dispatch({
                type: cartConstants.GET_ALL,
                length: length
            });
        };
    }
    const cart = JSON.parse(cartString);
    if(cart)
        length = cart.length;
    //    return { type: cartConstants.GET_COUNT, length };
    return dispatch => {
        dispatch({
            type: cartConstants.GET_ALL,
            cart: cart,
            length: length
        });
    };
}
