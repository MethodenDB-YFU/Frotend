import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
//import { reducer as oidcReducer } from 'redux-oidc';
import LoginReducer from './loginReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    user: LoginReducer,
    //oidc: oidcReducer,
    cart: cartReducer
});

export default rootReducer;