const loginReducer = (state = {
    isLoginSuccess: false,
    isLoginPending: false,
    token: null,
    username: null,
    loginError: null,
    user: {
        isLoginSuccess: false,
        isLoginPending: false,
        loggedIn: null,
        username: null,
        token: null,
        profile: null
    }
},
action) => {
    console.log('action.type',action.type);
    console.log('action',action);
    console.log('state',state);
    switch(action.type){
    case 'SET_LOGIN_PENDING':
        state = {
            ...state,
            isLoginPending: true,
            user: {
                isLoginSuccess: false,
                loggedIn: false,
                isLoginPending: true,
            }
        };
        break;
    case 'SET_LOGIN_SUCCESS':
        state = {
            ...state,
            isLoginSuccess: true,
            loggedIn: true,
            isLoginPending: false,
            username: action.user.username,
            token: action.user.token,
            user: {
                isLoginSuccess: true,
                isLoginPending: false,
                username: action.user.username,
                token: action.user.token,
                profile: action.user.profile
            }
        };
        break;
    case 'SET_LOGIN_ERROR':
        state = {
            ...state,
            loginError: true,
            isLoginPending: false,
            user: {
                isLoginSuccess: true,
                loggedIn: true,
                isLoginPending: false,
            }
        };
        break;
    }
    return state;
};

export default loginReducer;