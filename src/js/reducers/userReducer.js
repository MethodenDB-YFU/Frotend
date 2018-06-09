import {userConstants} from '../actions/constants';

/*
const initialState = {
    id: '',
    username: '',
    fullName:'',
    loggedIn: true
};
*/
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function (state = initialState, action) {
    console.log('action.type',action.type);
    switch (action.type) {
    case userConstants.FETCH_USER:
        return action.user;
    case userConstants.USER_LOGGED_IN:
        return {
            loggedIn: true,
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
            user: action.user
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        return {};
    default:
        return state;
    }
}