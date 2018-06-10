import store from '../store';
import {urlConstants} from '../constants';

export const urlHelper = {
    buildURL,
    buildHeader,
    buildFetchParams
};

function buildURL(service, parameter) {
    let url =  urlConstants.apiURL + service.url;
    switch (service) {
    case urlConstants.getMethod:
        url = urlConstants.apiURL + service.url + parameter;
        break;
    default:
        return url;
    }
    return url;
}

function buildHeader() {
    const state = store.getState();
    const user = state.user.user;
    console.log('user',user);
    let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-User-ID': user.id
    };
    return header;
}

function buildFetchParams(service, parameter = {}) {
    const url = buildURL(service, parameter);
    const header = buildHeader();
    const fetchParams = {
        url: url,
        request: {
            method: service.method,
            headers: header
        }
    };
    return fetchParams;
}
