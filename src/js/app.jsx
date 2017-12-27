import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
                            <MenuItem key="method">Methoden</MenuItem>
                            <MenuItem key="deminar">Seminarziele</MenuItem>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px' }}>
                        <div style={{background: '#fff', padding: 24, minHeight: 280 }}>
                            <MethodFormContainer />
                        </div>
                    </Content>
                </Layout>
                );
    }
}
;

export default App;

ReactDOM.render(<App />, document.getElementById('root'));