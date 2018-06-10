import {userConstants} from './constants';
import { userService } from '../middleware';
import { alertActions } from './';
import { history } from '../helpers';
/**
 * Redux Actions for User
 */
export const userActions = {
    login,
    logout,
    userLoggedIn,
    getUser,
    saveUser,
    deleteUser
};

/**
 * React action methode for Login
 * @return {object} 
 * @public
 */
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    console.log('user',user);
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
};

function logout() {
    console.log('logout');
    userService.logout();
    return { type: userConstants.LOGOUT };
}
function userLoggedIn() {
    const user = userService.userLoggedIn();
    console.log('userLoggedIn',user);
    return {
        type: userConstants.USER_LOGGED_IN,
        user: user
    };
};
function getUser () {
    const user = localStorage.getItem('user');
    console.log('getUser',user);
    return dispatch => {
        dispatch({
            type: userConstants.FETCH_USER,
            user: user
        });
    };
};

function saveUser(post) {
    return post;
};

function deleteUser(id) {
    return id;
};