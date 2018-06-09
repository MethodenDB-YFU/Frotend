import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userActions } from '../actions/userActions';

function isLoggdIn () {
    const userLoggedIn = userActions.userLoggedIn();
    return userLoggedIn.user;
}
export const PrivateRoute = ({ component: Component, path: Path, rest }) => (
    <Route exact path={Path} {...rest} render={props => (
        isLoggdIn()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/logon', state: { from: props.location } }} />
    )} />
);
