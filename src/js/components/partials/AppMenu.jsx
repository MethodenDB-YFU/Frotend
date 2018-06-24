import React, { Component } from 'react';
import { Menu, Icon, Badge } from 'antd';
import { userActions } from '../../actions/userActions';
import { cartActions } from '../../actions/cartActions';
import store from '../../store';
import { connect } from 'react-redux';
import { history } from '../../helpers';
import Logo from '../../../images/logo/logo.js';
import '../../../less/styles.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
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
            user: {},
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
        const state = store.getState();
        var user = state.user.user;
        if(!user) {
            const userLoggedIn = userActions.userLoggedIn();
            user = userLoggedIn.user; 
        }
        //console.log('AppMenu-isLoggdIn',user);
        if(this.state.user != user)
            this.setState({user: user});
        return user;
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
        this.props.dispatch(userActions.logout());
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
        switch (key) {
        case 'method':
            history.push('/');
            break;
        case 'seminar':
            // history.push('/');
            break;
        case 'cart':
            history.push('/cart');
            break;
        case 'logon':
            this.gotoLogoff();
            break;
        case 'seminartype':
            history.push('/seminar/type');
            break;
        case 'seminarrole':
            history.push('/seminar/role');
            break;
        case 'seminargoal':
            history.push('/seminar/goal');
            break;
        }
    }
    /**
     * initialy read the cart items
     */
    componentDidMount() {
        this.props.dispatch(cartActions.getCart());
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
                    style={{lineHeight: '62px' }}
                >
                    <MenuItem key="method">Methoden</MenuItem>
                    <SubMenu key="sub1" title='Seminar'>
                        <MenuItem key="seminartype">Typen</MenuItem>
                        <MenuItem key="seminargoal">Ziele</MenuItem>
                        <MenuItem key="seminarrole">Rollen</MenuItem>
                    </SubMenu>
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
/**
 * 
 * @param {Object} state 
 */
function mapStateToProps(state) {
    const { user, cart } = state;
    //    console.log('map Cart',cart);
    return {
        user,
        cart
    };
}

const connectedAppMenuPage = connect(mapStateToProps)(AppMenuComponent);
export { connectedAppMenuPage as AppMenu }; 
