import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { userActions } from '../actions/userActions';

const MenuItem = Menu.Item;
  
function isLoggdIn () {
    const userLoggedIn = userActions.userLoggedIn();
    return userLoggedIn.user;
}
export const AppMenu = () => (
    isLoggdIn() &&
    <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['method']}
        style={{lineHeight: '62px' }}
    >
        <MenuItem key="method"><Link to="/">Methoden</Link></MenuItem>
        <MenuItem key="seminar">Seminarziele</MenuItem>
        <MenuItem key="logon"><Link to="/logon"><Icon type="logout" />Abmelden</Link></MenuItem>
    </Menu>
);
