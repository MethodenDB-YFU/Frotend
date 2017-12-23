import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu } from 'antd';
//import FormContainer from "./components/container/form-container";

const {Header, Footer, Sider, Content} = Layout;

class App extends Component {
    render() {
        return (
                <Layout>
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider>Sider</Sider>
                        <Content>Content</Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
                );
    }
};

export default App;
    
ReactDOM.render(<App />, document.getElementById('root'));