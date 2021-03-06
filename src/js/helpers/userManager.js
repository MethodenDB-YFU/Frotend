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
//client_id: '63ffd718-a700-4910-b8a4-f1a2f641d229',
//client_id: 'afc7b43f-659b-4357-b8f7-703b02b36e7d',
const userManagerConfig = {
    client_id: 'e7ae723a-7f23-4b11-a91d-d3db39d848a8',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: 'id_token',
    scope: 'openid',
    authority: 'https://login.microsoftonline.com/90d6040d-e0e5-4b66-b149-4b2328b5f563/',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/`,
    automaticSilentRenew: true,
    //filterProtocolClaims: true,
    loadUserInfo: true,
};
/*
const userManagerConfig = {
    client_id: '982f8a61-9b6c-4f2b-9b0d-8bfd3b08c8d5',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: 'id_token',
    scope: 'openid',
    authority: 'https://login.microsoftonline.com/90d6040d-e0e5-4b66-b149-4b2328b5f563/',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/`,
};
const userManagerConfig = {
    client_id: '194997483617-j5f445caksb109g5ui3ss368reh15rnt.apps.googleusercontent.com',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: 'token id_token',
    scope: 'openid',
    authority: 'https://accounts.google.com',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
};
*/

const userManager = createUserManager(userManagerConfig);
//userManager.Log.logger = console;
export default userManager;
