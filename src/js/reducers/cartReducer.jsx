import { cartConstants } from '../constants';

let methods = JSON.parse(localStorage.getItem('methods'));
const initialState = methods ? methods : [];

export default function (state = initialState, action) {
    console.log('action.type',action.type);
    //console.log('action',action);
    //console.log('state',state);
    switch (action.type) {
    case cartConstants.GET_ALL:
    {
        let newCart = action.cart;
        if(!newCart)
            newCart = state;
        //console.log('newCart', newCart);
        return newCart;
    }
    case cartConstants.ADD_METHOD:
    {
        //let methode = {id:action.methodId};
        let newMethod = action.method;
        //console.log('method', newMethod);
        let newState = state;
        if(state == null) {
            newState = [newMethod];
        } else {
            let index = state.findIndex(method => method.id == newMethod.id);
            if (index == -1) {
                newState = [...state, newMethod];
            }    
        }
        //console.log('new State', newState);
        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
    }
    case cartConstants.DELETE_METHOD:
    {
        let newState = state;
        newState = state.filter((method) => method.id !== action.id);
        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
    }
    case cartConstants.GET_COUNT:
        return state;
    default:
        return state;
    }
}