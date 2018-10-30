import store from '../store';
import {urlConstants} from '../constants';
import { userService } from '../middleware';

export const urlHelper = {
    buildURL,
    buildHeader,
    buildFetchParams
};

let USE_BEARER = false;

function buildURL(service, parameter = null) {
    const services = urlConstants[service.service];
    const ackService = services[service.name];
    const apiURL = services.apiURL;
    let url =  apiURL + ackService.url;

    if(ackService.hasParameter) {
        url = apiURL + ackService.url + parameter;
    }else{
        url =  apiURL + ackService.url;
    }
    return url;
}

function buildHeader() {
    const state = store.getState();
    const user = state.user.user;
    console.log('buildHeader:user',state.user);
    let userId = null;
    let userToken = null;
    console.log('user',user);
    if(user) {
        if(user.id) {
            userId = user.id;
        } else {
            if(user.profile) {
                if(user.profile.sub)
                    userId = user.profile.sub;
                else
                    userId = user.id_token;
            }
        };
        if(user.Token)
            userToken = user.Token;
        if (!userToken) {
            userToken = userService.getUserToken();
        }

    }
    console.log('userId',userId);
    let header = {
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        //'Access-Control-Allow-Headers': 'Content-Type, Accept, X-User-ID',
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        //'Authorization' : 'Bearer'
        //'X-User-ID': 'ec7869c0-1853-4592-8835-0477953e781a'
    };
    if(USE_BEARER === 'true') {
        if(userToken)
            header = { ...header,
                'Authorization' : 'Bearer '+userToken
            };
    }
    /*
    if(userId)
        header = { ...header,
            'X-User-ID': userId
        };
        */
    return header;
}

function buildFetchParams(service, parameter = null, data = {}) {
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
