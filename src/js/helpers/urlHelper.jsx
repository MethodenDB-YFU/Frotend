import store from '../store';
import {urlConstants} from '../constants';

export const urlHelper = {
    buildURL,
    buildHeader,
    buildFetchParams
};

function buildURL(service, parameter) {
    const services = urlConstants[service.service];
    const ackService = services[service.name];
    const apiURL = services.apiURL;
    let url =  apiURL + ackService.url;

    if(service.hasParameter) {
        url = apiURL + ackService.url + parameter;
    }else{
        url =  apiURL + ackService.url;
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
