import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';
import UserReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    user: UserReducer,
    oidc: oidcReducer,
    cart: cartReducer
});

export default rootReducer;