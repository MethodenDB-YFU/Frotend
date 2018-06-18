import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Menu, Icon, Row, Col, Badge } from 'antd';
import { userActions } from '../../actions/userActions';
import { cartActions } from '../../actions/cartActions';
import store from '../../store';
import { connect } from 'react-redux';
import { history } from '../../helpers';
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
        this.state = {
            user: {},
            cartCount: 0
        };
        this.onMenuClick = this.onMenuClick.bind(this);
    }

    /**
     * render method
     * @return {Object} user
     * @private
     */
    isLoggdIn () {
        const state = store.getState();
        var user = state.user.user;
        if(!user) {
            const userLoggedIn = userActions.userLoggedIn();
            user = userLoggedIn.user; 
        }
        console.log('AppMenu-isLoggdIn',user);
        if(this.state.user != user)
            this.setState({user: user});
        return user;
    }
    /**
     * render method
     * @return {Int} methods
     * @private
     */
    cartCount () {
        const state = store.getState();
        var anz = 0;
        console.log('cartCount:State',state);
        if (state.cart) {
            var cart = state.cart;
            if(cart) {
                anz = cart.length;
            }
        } else {
            const cartCount = cartActions.getBasketCount();
            anz = cartCount.length;
        }
        console.log('cartCount:anz',anz);
        return anz;
    }
    gotoLogoff() {
        this.props.dispatch(userActions.logout());
        history.push('/logon');
    }
    onMenuClick ( { key } ) {
    /* { item, key, selectedKeys } */
        console.log('onMenuClick:e', key);
        switch (key) {
        case 'method':
            history.push('/');
            break;
        case 'seminar':
            history.push('/');
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
     * initialy disables submit button
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
            <Row type="flex" justify="space-between">
                <Col span={1}>
                    <Logo/>
                </Col>
                <Col span={20}>
                    <Menu
                        onClick={this.onMenuClick.bind(this)}
                        id='YfuMenu'
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['method']}
                        style={{lineHeight: '62px' }}
                    >
                        <MenuItem key="method">Methoden</MenuItem>
                        <MenuItem key="seminar">Seminarziele</MenuItem>
                    </Menu>
                </Col>
                <Col span={3}>
                    <Menu
                        onClick={this.onMenuClick.bind(this)}
                        theme="light"
                        mode="horizontal"
                        style={{lineHeight: '62px' }}
                    >
                        <MenuItem key="cart"><a href="/cart"> 
                            <Badge count={this.cartCount()} id="cardBadge" style={{ backgroundColor: '#642869' }}>
                                <Icon type="shopping-cart" style={{ fontSize: 20 }}/>
                            </Badge>
                        </a></MenuItem>
                        <MenuItem key="logon"><Icon type="logout" />Abmelden    </MenuItem>
                    </Menu>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    const { user, cart } = state;
    console.log('map Cart',cart);
    return {
        user,
        cart
    };
}

const connectedAppMenuPage = connect(mapStateToProps)(AppMenuComponent);
export { connectedAppMenuPage as AppMenu }; 
