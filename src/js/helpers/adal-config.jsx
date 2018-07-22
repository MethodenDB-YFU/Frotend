import AuthenticationContext from 'adal-angular';

var adalConfig = {
    instance: 'https://login.microsoftonline.com/',
    tenant: '90d6040d-e0e5-4b66-b149-4b2328b5f563',
    clientId: '8e64138a-e22c-40b1-b782-25e26bbe952d',
    extraQueryParameter: 'nux=1',
    disableRenewal: true,
    //cacheLocation: 'localStorage',
    endpoints: {
        localhostUri: 'http://localhost:8080'
    }
};

export const authContext = new AuthenticationContext(adalConfig);

const isCallback = authContext.isCallback(window.location.hash);

authContext.handleWindowCallback();

if(isCallback && !authContext.getLoginError()){
    window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
}