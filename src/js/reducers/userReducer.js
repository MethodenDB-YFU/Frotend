import {userConstants} from '../constants';
import { SESSION_TERMINATED, USER_EXPIRED, LOADING_USER, USER_FOUND} from 'redux-oidc';
import { userService } from '../middleware';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function (state = initialState, action) {
    console.log('action.type',action.type);
    switch (action.type) {
    case userConstants.FETCH_USER:
        return action.user;
    case userConstants.USER_LOGGED_IN:
        console.log('USER_LOGGED_IN action',action);
        return {
            loggedIn: true,
            toLogin: false,
            user: action.user
        };
    case userConstants.LOGIN_REQUEST:
        return {
            loggedIn: true,
            user: action.user
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            toLogin: false,
            user: action.user
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        return {};
    case USER_FOUND:
        console.log('USER_FOUND action',action);
        console.log('USER_FOUND state',state);
        userService.SetLoading(false);
        if(!action.payload.expired)
            userService.SetExpired(false);
        return {
            loggedIn: true,
            toLogin: false,
            user: action.payload
        };
    case SESSION_TERMINATED:
        console.log('action',action);
        console.log('state',state);
        return {};
    case USER_EXPIRED:
        console.log('action',action);
        console.log('state',state);
        console.log('window.location',window.location.pathname);
        userService.SetExpired(true);
        return {
            loggedIn: false,
            toLogin: !(window.location.pathname == '/logon'),
            user: {}
        };
    case LOADING_USER:
        console.log('action',action);
        console.log('state',state);
        userService.SetLoading(true);
        userService.SetExpired(false);
        //return state;
        return Object.assign({}, {...state}, { isLoadingUser: true , toLogin: false});
    default:
        return state;
    }
}