import { authContext } from '../helpers/adal-config';
export const userService = {
    userLoggedIn,
    SetLoading,
    GetLoading,
    SetExpired,
    GetExpired,
    getUserToken
};

function SetLoading(state) {
    console.log('SetLoading',state);
    sessionStorage.setItem('userLoading',state);
}

function GetLoading() {
    const loadingState = sessionStorage.getItem('userLoading');
    return (loadingState == 'true');
}

function SetExpired(state) {
    console.log('SetExpired',state);
    sessionStorage.setItem('userExpired',state);
}
/**
* Get the expired state from sessionStorage
*/
function GetExpired() {
    const expiredState = sessionStorage.getItem('userExpired');
    return (expiredState == 'true');    
}

function userLoggedIn() {
    let isLogin = false;
    let user = authContext.getCachedUser();
    console.log('CachedUser',user);
    if (user) {
        let idToken = authContext.getCachedToken(authContext.config.clientId);
        console.log('CachedToken',idToken);
        if(idToken)
            isLogin = true;
    }
    return isLogin;
}
function getUserToken() {
    let idToken = authContext.getCachedToken(authContext.config.clientId);
    console.log('getUserToken',idToken);
    return idToken;
}