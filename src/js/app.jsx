import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { history } from './helpers';

import { connect } from 'react-redux';
import store from './store';
import { Provider } from 'react-redux';
import { AppMenu } from './components/partials/AppMenu';
import { RouterComponent } from './components/partials/RouterComponent';

import { OidcProvider } from 'redux-oidc';
import userManager from './helpers/userManager';
import { userService } from './middleware';

import '../less/styles.less';

const {Header, Content} = Layout;
  

/**
 * base class
 * @extends Component
 */
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            oidc: {},
            cart: {},
            isLoadingUser: true
        };

        // const { dispatch } = this.props;
        history.listen((location, action) => {
            console.log(action, location);

        });
    };
    isLoading() {
        //const state = this.state;
        const state = store.getState();
        const oidc  = state.oidc;
        console.log('isLoading',oidc);
        if(!oidc)
            return true;
        if (oidc.isLoadingUser == null)
            return true;
        return oidc.isLoadingUser;
    };
    /**
     * render method
     * @return {ReactElement} markup
     * @todo move inline styles to style-sheet
     * @private
     */
    render() {

        return (
            <Layout className="layout">
                <Header className="yfu_menu">
                    <AppMenu></AppMenu>
                </Header>
                <Content>
                    <RouterComponent></RouterComponent>
                </Content>}
            </Layout>
        );
    }
}
function mapStateToProps(state) {
    let { user } = state;
    let { oidc } = state;
    const { cart } = state;
    //console.log('App map User',user);
    //console.log('App map Cart',cart);
    user = userService.mapOidc2User(oidc,user);
    return {
        user,
        oidc: oidc,
        cart
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <OidcProvider store={store} userManager={userManager}>
                <App />
            </OidcProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
 