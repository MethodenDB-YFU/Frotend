import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { history } from './helpers';

import { connect } from 'react-redux';
import store from './store';
import { Provider } from 'react-redux';
import { PrivateRoute } from './components/partials/PrivateRoute';
import { AppMenu } from './components/partials/AppMenu';

import { OverviewContainer } from './components/container/overview-container';
import { MethodFormContainer } from './components/container/method-form-container';
import { MethodDetailContainer } from './components/container/method-detail-container';
import { LogonFormContainer } from './components/container/logon-container';
import { CartContainer } from './components/container/method-cart-container';
import '../less/styles.less';

import { userActions } from './actions/userActions';
import { cartActions } from './actions/cartActions';

//import './favicon.ico';

//const {Header, Content} = Layout;
const {Header} = Layout;
//const MenuItem = Menu.Item;
  

/**
 * base class
 * @extends Component
 */
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };

        // const { dispatch } = this.props;
        history.listen((location, action) => {
            console.log(action, location);
            const state = store.getState();
            var user = state.user.user;
            if(!user) {
                const userLoggedIn = userActions.userLoggedIn();
                user = userLoggedIn.user; 
            }
            // clear get Login User
            //dispatch(userActions.userLoggedIn());
            console.log('history.listen',user);
            this.setState({user: user});
        });
    };

    /**
     * render method
     * @return {ReactElement} markup
     * @todo move inline styles to style-sheet
     * @private
     */
    render() {
        var { user } = this.props;
        if(!user) {
            const userLoggedIn = userActions.userLoggedIn();
            if (userLoggedIn)
                user = userLoggedIn.user;
        } else {
            console.log('render',user);
        }
        var { cart } = this.props;
        if(!cart) {
            cart = cartActions.getBasket();
        }
        return (
            <Layout className="layout">
                <Header className="yfu_menu">
                    <AppMenu></AppMenu>
                </Header>
                <Router history={history}>
                    <div style={{background: '#fff', padding: 24, minHeight: 280 }}>
                        <PrivateRoute path="/" exact component={OverviewContainer} />
                        <Route path="/method/new" exact component={MethodFormContainer}/>
                        <Route path="/method/show/:id" component={MethodDetailContainer}/>
                        <Route path="/cart" exact component={CartContainer}/>
                        <Route path="/logon" exact component={LogonFormContainer}/>
                    </div>
                </Router>
            </Layout>
        );
    }
}
function mapStateToProps(state) {
    const { user } = state;
    const { cart } = state;
    console.log('map User',user);
    console.log('map Cart',cart);
    return {
        user,
        cart
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));