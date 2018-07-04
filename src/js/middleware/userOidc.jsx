import userManager from '../helpers/userManager';
import store from '../store';
import { userActions } from '../actions/userActions';

export const userService = {
    logout,
    userLoggedIn,
    signIn,
    mapOidc2User,
    SetLoading,
    GetLoading,
    SetExpired,
    GetExpired
};

/**
 * Map OpenID Conect data to User
 * @param {*} oidc 
 * @param {*} user 
 */
function mapOidc2User(oidc, user) {
    let newUser = user;
    let isLoadingUser = false;
    if(user.isLoadingUser)
        isLoadingUser = user.isLoadingUser;
    if ((!user.id)&&(oidc.user)) {
        let toLogin = false;
        if(oidc.user.expired && !(window.location.pathname == '/logon'))
            toLogin = true;
        newUser = {
            id: oidc.user.profile.sub,
            fullName: oidc.user.profile.name,
            loggedIn: !oidc.user.expired,
            isLoadingUser: isLoadingUser,
            toLogin: toLogin,
            ...oidc.user
        };
    }
    if(!oidc.user){
        newUser = {
            loggedIn: false,
            isLoadingUser: isLoadingUser,
            toLogin: !(window.location.pathname == '/logon'),
            user: user.user,
        };
    }
    return newUser;
}
/**
 * Logout the User
 */
function logout() {
    userManager.removeUser(); // removes the user data from sessionStorage
}

function userLoggedIn() {
    console.log('userLoggedIn->> Call');
    let user = {
        id: '',
        fullName: '',
        loggedIn: false
    };
    const state = store.getState();
    //const { dispatch } = state;
    const oidc = state.oidc;
    const stateUser = state.user;
    if(stateUser.loggedIn) {
        console.log('User fond in State',stateUser);
        return stateUser;
    }
    //console.log('oidc',oidc);
    if (!oidc) {
        console.error('Oidc data not found!');
        return null;
    }
    const oidcUser = oidc.user;
    if (!oidcUser) {
        const isLoading = GetLoading();
        if(isLoading == true){
            user = {
                loggedIn: false,
                isLoadingUser: true
            };
            return user;
        }
        const isExpired = userService.GetExpired();
        if(isExpired == true) {
            SetLoading(false);
            user = {
                loggedIn: false,
                isLoadingUser: false
            };
            return user;
        }
        console.error('OidcUser data not found!');
        SetLoading(true);
        //setTimeout(() => {
        userManager.getUser()
            .then(function (oidc_User) {
                console.log('userLoggedIn get OidcUser',oidc_User);
                if(oidc_User){
                    let toLogin = false;
                    if(oidc_User.expired && !(window.location.pathname == '/logon'))
                        toLogin = true;
                    let newUser = {
                        id: oidc_User.profile.sub,
                        fullName: oidc_User.profile.name,
                        loggedIn: !oidc_User.expired,
                        isLoadingUser: false,
                        toLogin: toLogin,
                        ...oidc_User
                    };
                    user = newUser;
                    console.log('userLoggedIn User loggedIn:',user.loggedIn);
                    if((user.id_token != stateUser.id_token)&&(user.loggedIn==true)){
                        console.log('dispatch userFound:',user);
                        //console.log('user.id',user.id_token);
                        //console.log('stateUser.id',stateUser.id_token);
                        store.dispatch(userActions.userFound(user));
                    }
                    SetLoading(false);
                } else {
                    user.loggedIn = false;
                }
                return user;
            });
        //}, 2000);
        user = {
            loggedIn: false,
            isLoadingUser: true
        };
        return user;
    }
    user = {
        id: oidcUser.id_token,
        fullName: oidcUser.profile.name,
        loggedIn: !oidcUser.expired,
        ...oidcUser
    };
    return user;
}

function signIn() {
    userManager.signinRedirect()
        .then(function (user) {
            console.log('signIn set User',user);
            store.setState(user);
            return user;
        });
}

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