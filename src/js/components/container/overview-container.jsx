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

const data = [{
        key: '1',
        name: 'Albatross',
        seminar: 'VBT',
        typ: 'Simulation',
        level: 'Persönlich'
    }, {
        key: '2',
        name: 'Eisberg',
        seminar: 'VBT',
        typ: 'Diskussion',
        level: 'Theoretisch'
    }, {
        key: '3',
        name: 'Kommunikationsspiel "Sesamstraße"',
        seminar: 'VBT',
        typ: 'Simulation',
        level: 'Persönlich'
    }];

export class OverviewContainer extends Component {
    constructor() {
        super();
        this.state = {

        };
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
                    <Table columns={columns} dataSource={data} />
                </div>
                );
    }
}