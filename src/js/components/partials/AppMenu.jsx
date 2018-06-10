import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Row, Col } from 'antd';
import { userActions } from '../../actions/userActions';
import store from '../../store';

const MenuItem = Menu.Item;

/**
 * form fields to describe the method with some meta data
 * @module components/partials/AppMenu
 * @extends Component
 */
export class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
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
     * @return {ReactElement} markup
     * @private
     */
    render() {
        return (
            this.isLoggdIn() &&
            <Row>
                <Col span={23}>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['method']}
                        style={{lineHeight: '62px' }}
                    >
                        <MenuItem key="method"><Link to="/">Methoden</Link></MenuItem>
                        <MenuItem key="seminar">Seminarziele</MenuItem>
                    </Menu>
                </Col>
                <Col span={1}>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        style={{lineHeight: '62px' }}
                    >
                        <MenuItem key="logon"><a href="/logon"><Icon type="logout" />Abmelden</a></MenuItem>
                    </Menu>
                </Col>
            </Row>
        );
    }
}
