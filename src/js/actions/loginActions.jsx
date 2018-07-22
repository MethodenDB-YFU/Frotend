import { authContext } from '../helpers/adal-config';
let user = authContext.getCachedUser();
// let userName = undefined;
// let userToken = null;
let userData = {
    userName: undefined,
    Token: null,
    profile: null
};

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

function setLoginPending(){
    return{
        type: SET_LOGIN_PENDING,
    };
}

function setLoginSuccess(userData){
    return{
        type: SET_LOGIN_SUCCESS,
        user:  {
            userName: userData.userName,
            Token: userData.Token,
            profile: userData.profile
        }
    };
}

function setLoginError(){
    return{
        type: SET_LOGIN_ERROR
    };
}

export function checkLoginStatus(){
    console.log('checkLoginStatus ',user);
    return dispatch => {
        dispatch(setLoginPending());
        if (user) {
            console.log('ADAL user: ', user);
            // userName = user.profile.name;
            userData.userName = user.profile.name;
            userData.profile = user.profile;
            // Acquire token
            authContext.acquireToken(authContext.config.clientId, function(error, token) {
            // Handle ADAL Errors.
                if (error) {
                    dispatch(setLoginError());
                    console.log('ADAL error occurred: ' + error);
                    return;
                }

                if (!token) {
                    console.log('No token!');
                    return;
                }
                userData.Token = token;
                // userToken = token;
            });
            dispatch(setLoginSuccess(userData));
        } else {
            authContext.login();
        }
    };
}

export function loginUser(){
    authContext.login();
}

export function logoutUser() {
    //console.log('logout');
    authContext.logOut();
}