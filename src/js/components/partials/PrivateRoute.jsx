import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
//import { userActions } from '../../actions/userActions';
//import { userService } from '../../middleware';

export default class PrivateRouteComponent extends Component {
    constructor(props) {
        super(props);
        //console.log('PrivateRouteComponent',props);
        this.state = {
            user: props.user
        };
    };
    isLoggdIn () {
        var user = {};
        console.log('PrivateRoute:Props User',this.props.user);
        if(this.props.user)
            user = this.props.user;
        if(!user) {
            const state = store.getState();
            console.log('PrivateRoute:Store store',state.user);
            user = state.user.user;
        }
        if(user.toLogin) {
            console.log('PrivateRoute:toLogin',user.toLogin);
            return !user.toLogin;
        } else {
            console.log('PrivateRoute:user',user);
            return user;
        }
    };
    render() {
        const Component = this.props.component;
        //const isLoggdIn = this.isLoggdIn();
        const toLogin = !this.props.user.toLogin;
        return (
            <Route exact path={this.props.path} render={props => (
                toLogin
                    ?<Component/>
                    : <Redirect to={{ pathname: '/logon', state: { from: props.location }}} />
                
            )} />
        );
    }
}

function mapStateToProps(state) {
    let { user } = state;
    //const { oidc } = state;
    //console.log('PrivateRoute map User',user);
    //console.log('PrivateRoute map oidc',oidc);
    // user = userService.mapOidc2User(oidc,user);
    return {
        user
        //oidc
    };
    
}
const connectedPrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);
export { connectedPrivateRoute as PrivateRoute }; 
