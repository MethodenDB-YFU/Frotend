import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { OverviewContainer } from './components/container/overview-container';
import { MethodFormContainer } from './components/container/method-form-container';
import '../less/styles.less';

const {Header, Content} = Layout;
const MenuItem = Menu.Item;

class App extends Component {
    render() {
        return (
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['method']}
                            style={{lineHeight: '62px' }}
                            >
                            <MenuItem key="method"><Link to="/">Methoden</Link></MenuItem>
                            <MenuItem key="seminar">Seminarziele</MenuItem>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px' }}>
                        <div style={{background: '#fff', padding: 24, minHeight: 280 }}>
                            <Route path="/" exact component={OverviewContainer}/>
                            <Route path="/method/new" exact component={MethodFormContainer}/>
                        </div>
                    </Content>
                </Layout>
                );
    }
};

export default App;

ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>,
                document.getElementById('root'));