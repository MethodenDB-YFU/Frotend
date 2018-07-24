//import React from 'react';
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
/*
import { OidcProvider } from 'redux-oidc';
import userManager from './helpers/userManager';
import { userService } from './middleware';
*/
import { loginUser, checkLoginStatus } from './actions/loginActions';
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
    };
    /**
     * 
     */
    componentDidMount(){
        // this.props.checkLoginStatus();
        //const dispatch = this.props.dispatch;
        //this.props.dispatch(checkLoginStatus());
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
    const { cart } = state;
    return {
        username: state.loginReducer.username,
        user,
        cart
    };
}

function mapDispatchToProps (dispatch) {
    console.log('App:mapDispatchToProps');
    return {
        login: () => {
            dispatch(loginUser());
        },
        checkLoginStatus: () => {
            dispatch(checkLoginStatus());
        }
    };
};

const connectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export { connectedApp as App }; 

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
 