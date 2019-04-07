import React, { Component } from 'react';
import { Menu, Icon, Badge } from 'antd';
//import { userActions } from '../../actions/userActions';
import { logoutUser } from '../../actions/loginActions';
import { cartActions } from '../../actions/cartActions';
import store from '../../store';
import { connect } from 'react-redux';
import { history } from '../../helpers';
import { userService } from '../../middleware';
import Logo from '../../../images/logo/Logo.js';
import '../../../less/styles.less';

const MenuItem = Menu.Item;
/**
 * form fields to describe the method with some meta data
 * @module components/partials/AppMenu
 * @extends Component
 */
export class AppMenuComponent extends Component {
    constructor(props) {
        super(props);
        /**
         *
         */
        this.state = {
            user: props.user,
            cart: props.cart,
            cartCount: 0
        };
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onLogoClick = this.onLogoClick.bind(this);
    }

    /**
     * check is user Loggd in
     *  @return {Object} methods
     * @private
     */
    isLoggdIn () {
        let userLoggdIn = false;
        userLoggdIn = userService.userLoggedIn();
        if(userLoggdIn != true){
        //const state = store.getState();
            const state = this.state;
            console.log('AppMenu-isLoggdIn:state',state);
            var user = null;
            if(state.user)
                user = state.user.user;
            //console.log('AppMenu-isLoggdIn',user);
            if(this.state.user != user){
                // console.log('AppMenu new User State',user);
                //this.setState({user: user});
            }
            if(user){
                if(typeof user.loggedIn != 'undefined'){
                    userLoggdIn = user.loggedIn;
                } else {
                    if(typeof user.user.loggedIn != 'undefined'){
                        userLoggdIn = user.user.loggedIn;
                    }
                }
            }
        }
        return userLoggdIn;
    }
    /**
     * count the items in cart
     * @return {Int} methods
     * @private
     */
    cartCount () {
        const state = store.getState();
        var anz = 0;
        //console.log('cartCount:State',state);
        if (state.cart) {
            var cart = state.cart;
            if(cart) {
                anz = cart.length;
            }
        } else {
            const cartCount = cartActions.getBasketCount();
            anz = cartCount.length;
        }
        //console.log('cartCount:anz',anz);
        return anz;
    }
    /**
     * set user invalid and go to logon view
     */
    gotoLogoff() {
        this.props.logout();
        history.push('/logon');
    }

    onLogoClick() {
        history.push('/');
    }
    /**
     * handle klick un menu item
     * @param {string} param0
     */
    onMenuClick ( { key } ) {
    /* { item, key, selectedKeys } */
        //console.log('onMenuClick:e', key);
        this.setState({selectedKeys: [key]});
        switch (key) {
        case 'method':
            history.push('/');
            break;
        case 'seminar':
            history.push('/seminar');
            break;
        case 'cart':
            history.push('/cart');
            break;
        case 'logon':
            this.gotoLogoff();
            break;
        }
    }
    /**
     * initialy read the cart items
     */
    componentDidMount() {
        // this.props.dispatch(cartActions.getCart());
        this.props.getCart();
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        return (
            this.isLoggdIn() &&
        <div className="yfu-menu-header">
            <div className="yfu-menu-logo" onClick={this.onLogoClick.bind(this)}>
                <Logo/>
            </div>
            <div className="yfu-menu-left">
                <Menu
                    onClick={this.onMenuClick.bind(this)}
                    id='YfuMenu'
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['method']}
                    selectedKeys={this.state.selectedKeys}
                    style={{lineHeight: '62px' }}
                >
                    <MenuItem key="method">Methoden</MenuItem>
                    <MenuItem key="seminar">Seminar</MenuItem>
                </Menu>
            </div>
            <div className="yfu-menu-right">
                <Menu
                    onClick={this.onMenuClick.bind(this)}
                    theme="light"
                    mode="horizontal"
                    style={{lineHeight: '62px' }}
                >
                    <MenuItem key="cart">
                        <Badge count={this.cartCount()} id="cardBadge" style={{ backgroundColor: '#642869' }}>
                            <Icon type="shopping-cart" style={{ fontSize: 20 }}/>
                        </Badge>
                    </MenuItem>
                    <MenuItem key="logon"><Icon type="logout" />Abmelden</MenuItem>
                </Menu>
            </div>
        </div>
        );
    }
}
function mapDispatchToProps (dispatch) {
    console.log('AppMenu:mapDispatchToProps');
    return {
        logout: () => {
            dispatch(logoutUser());
        },
        getCart: () => {
            dispatch(cartActions.getCart());
        }
    };
};

/**
 *
 * @param {Object} state
 */
function mapStateToProps(state) {
    let { user} = state;
    const { cart } = state;
    //const { user, cart } = state;
    //    console.log('map Cart',cart);
    return {
        user,
        cart
    };
}

const connectedAppMenuPage = connect(mapStateToProps,mapDispatchToProps)(AppMenuComponent);
export { connectedAppMenuPage as AppMenu };
