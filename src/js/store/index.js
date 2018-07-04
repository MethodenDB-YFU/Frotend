import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
//import promise from 'redux-promise-middleware';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { loadUser } from 'redux-oidc';
import userManager from '../helpers/userManager';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

//const middleware = composeWithDevTools(applyMiddleware(promise(), thunk));

//const store = createStore(rootReducer, middleware);
// const store = createStore(rootReducer);
//loadUser(store, userManager);

const initialState = {};

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory))
)(createStore);

const store = createStoreWithMiddleware(rootReducer, initialState);

loadUser(store, userManager);
export default store;
