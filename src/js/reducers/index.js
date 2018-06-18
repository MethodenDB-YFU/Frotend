import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: UserReducer,
    cart: cartReducer
});

export default rootReducer;