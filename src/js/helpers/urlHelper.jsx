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
    let userId = '0';
    if(user)
        userId = user.id;
    //console.log('user',user);
    let header = {
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        //'Access-Control-Allow-Headers': 'Content-Type, Accept, X-User-ID',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-User-ID': userId
    };
    return header;
}

function buildFetchParams(service, parameter = {}, data = {}) {
    const url = buildURL(service, parameter);
    const header = buildHeader();
    const services = urlConstants[service.service];
    const ackService = services[service.name];
    let fetchParams = {};
    if ((ackService.method == 'POST') || (ackService.method == 'PUT')){
        fetchParams = {
            url: url,
            request: {
                body: JSON.stringify(data),
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                method: ackService.method,
                headers: header
            }
        };
    } else {
        fetchParams = {
            url: url,
            request: {
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                method: ackService.method,
                headers: header
            }
        };
    }
    console.log('fetchParams',fetchParams);
    return fetchParams;
}
