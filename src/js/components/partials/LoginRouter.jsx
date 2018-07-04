import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
//import { userActions } from '../../actions/userActions';
import { userService } from '../../middleware';

export default class LoginRouteComponent extends Component {
    constructor(props) {
        super(props);
        //console.log('LoginRouteComponent',props);
        this.state = {
            user: {}
        };
    };
    isLoggdIn () {
        var user = {};
        console.log('LoginRouteComponent:Props User',this.props.user);
        if(this.props.user)
            user = this.props.user;
        // const state =  this.state;
        if(!user) {
            const state = store.getState();
            console.log('LoginRouteComponent:Store User',state.user);
            user = state.user.user;
        }
        if(user.toLogin) {
            console.log('LoginRouteComponent:toLogin',user.toLogin);
            return user.toLogin;
        } else {
            console.log('PrivateRoute:user',user);
            return user;
        }
    };
    render() {
        const Component = this.props.component;
        const isLoggdIn = this.isLoggdIn();
        return (
            <Route exact path={this.props.path} render={props => (
                isLoggdIn
                    ?<Component/>
                    : <Redirect to={{ pathname: '/', state: { from: props.location }}} />
                
            )} />
        );
    }
}

function mapStateToProps(state) {
    let { user } = state;
    const { oidc } = state;
    //console.log('PrivateRoute map User',user);
    //console.log('PrivateRoute map oidc',oidc);
    user = userService.mapOidc2User(oidc,user);
    return {
        user,
        oidc
    };
}
const connectedLoginRoute = connect(mapStateToProps)(LoginRouteComponent);
export { connectedLoginRoute as LoginRoute }; 
