import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Input, Table, Button } from 'antd';

const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>
    }, {
        title: 'Seminar',
        dataIndex: 'seminar',
        key: 'seminar'
    }, {
        title: 'Typ',
        dataIndex: 'typ',
        key: 'typ'
    }, {
        title: 'Level',
        dataIndex: 'level',
        key: 'level'
    }];

export class OverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            methods: [],
            tableLoading: true
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:1234/api/methods')
            .then(results => {
                return results.json();
            }).then(data => {
                let methods = data.map((method) => {
                    let methodJson = {
                        key: method.id,
                        name: method.title,
                        seminar: 'VBT',
                        typ: method.method_types[0].name,
                        level: method.method_levels[0].name
                    };
                    return methodJson;
                });
                this.setState({methods: methods});
                this.setState({tableLoading: false});
            });
    }

    render() {
        const createBtn = (<Link to="/method/new">Methode erstellen</Link>);
        
        return (
                <div>
                    <Row>
                        <Col span={12}>
                        <h1>Methodenübersicht</h1>
                        </Col>
                        <Col span={12}>
                        <Input size="large" placeholder="Albatross" addonAfter={createBtn} />
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={this.state.methods} loading={this.state.tableLoading} />
                </div>
                );
    }
}