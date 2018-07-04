import { createUserManager } from 'redux-oidc';

/*
const userManagerConfig = {
    client_id: 'e48d4214-364e-4731-b2b6-47dabf529218',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: 'id_token',
    scope: 'openid profil  https://yfu-deutschland.de',
    authority: 'https://login.microsoftonline.com/yfu-deutschland.de/',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
};
*/
const userManagerConfig = {
    client_id: '194997483617-j5f445caksb109g5ui3ss368reh15rnt.apps.googleusercontent.com',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: 'token id_token',
    scope: 'openid',
    authority: 'https://accounts.google.com',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);
//userManager.Log.logger = console;
export default userManager;
