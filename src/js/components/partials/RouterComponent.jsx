import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import store from '../../store';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../helpers';
import { userService } from '../../middleware';
import { loginUser, checkLoginStatus } from '../../actions/loginActions';

import { OverviewContainer } from '../container/overview-container';
import { MethodEditor } from '../../pages/method-editor';
import { Seminars } from '../../pages/seminars';
import { MethodDetailContainer } from '../../pages/method-view';
import { LogonFormContainer } from '../container/logon-container';
import { CartContainer } from '../container/method-cart-container';
import { CallbackPage } from '../container/callback_page';

//import { NOTINITIALIZED } from 'dns';
//import { NotFound} from '../container/NotFound';
//import { PrivateRoute } from './PrivateRoute';
//import { mapOidc2User } from '../../middleware';

export default class RouterComponentPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            isLoadingUser: true
        };
    };

    componentWillMount(){
        this.props.checkLoginStatus();
    };

    isLoading() {
        let loadingSate = true;
        const x = 1;
        if(x == 1) {
            loadingSate = userService.GetLoading();
            const expiredSate = userService.GetExpired();
            if(expiredSate == true)
                loadingSate = false;
            console.log('RouterComponentPart:loadingState',loadingSate);
            return loadingSate;
        } 
        //const state = this.state;
        const state = store.getState();
        loadingSate = state.user.isLoginPending;
        console.log('RouterComponentPart:loadingSate',loadingSate);
        return loadingSate;
    };
    /**
     * render method
     * @return {ReactElement} markup
     * @todo move inline styles to style-sheet
     * @private
     */
    render() {
        return (
            this.isLoading() 
                ? <center><ReactLoading type="spinningBubbles" color="#642869"  /></center>
                :<Router history={history}>
                    <div style={{background: '#fff', padding: 24, minHeight: 400 }}>
                        <Route path="/" exact component={OverviewContainer}/>
                        <Route path="/method" exact component={OverviewContainer}/>
                        <Route path="/method/new" exact component={MethodEditor}/>
                        <Route path="/method/show/:id" component={MethodDetailContainer}/>
                        <Route path="/cart" exact component={CartContainer}/>
                        <Route path="/logon" exact component={LogonFormContainer}/>
                        <Route path="/seminar"      exact component={() => (<Seminars activeTab="type"/>)}/>
                        <Route path="/seminar/type" exact component={() => (<Seminars activeTab="type"/>)}/>
                        <Route path="/seminar/role" exact component={() => (<Seminars activeTab="role"/>)}/>
                        <Route path="/seminar/goal" exact component={() => (<Seminars activeTab="goal"/>)}/>
                        <Route path="/callback" component={CallbackPage}/>
                    </div>
                </Router>
        );
    }
}

function mapDispatchToProps (dispatch) {
    console.log('RouterComponentPart:mapDispatchToProps');
    return {
        login: () => {
            dispatch(loginUser());
        },
        checkLoginStatus: () => {
            dispatch(checkLoginStatus());
        }
    };
};


function mapStateToProps(state) {
    let { user } = state;
    //const { oidc } = state;
    //console.log('Router map User',user);
    //console.log('Router map oidc',oidc);
    //user = userService.mapOidc2User(oidc,user);
    console.log('Router new User',user);
    //console.log('isLoadingUser',oidc.isLoadingUser);
    return {
        user,
        //oidc: state.oidc,
        //isLoadingUser: oidc.isLoadingUser,
    };
}
const connectedRouter = connect(mapStateToProps,mapDispatchToProps)(RouterComponentPart);
export { connectedRouter as RouterComponent }; 
