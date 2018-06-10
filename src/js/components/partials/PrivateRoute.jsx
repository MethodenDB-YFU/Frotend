import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../../store';
import { userActions } from '../../actions/userActions';

function isLoggdIn () {
    const state = store.getState();
    var user = state.user.user;
    if(!user) {
        const userLoggedIn = userActions.userLoggedIn();
        user = userLoggedIn.user; 
    }
    return user;
}
export const PrivateRoute = ({ component: Component, path: Path, rest }) => (
    <Route exact path={Path} {...rest} render={props => (
        isLoggdIn()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/logon', state: { from: props.location } }} />
    )} />
);
