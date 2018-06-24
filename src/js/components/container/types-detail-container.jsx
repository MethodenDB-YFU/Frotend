import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

const goalColumns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={'/goals/show/'+record.key}>{text}</Link>
}, {
    title: 'Beschreibung',
    dataIndex: 'explanation',
    key: 'explanation'
}];

/*
const roleColumns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={'/goals/show/'+record.key}>{text}</Link>
}, {
    title: 'Beschreibung',
    dataIndex: 'explanation',
    key: 'explanation'
}];
*/

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class TypesDetailContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: props.match.params.id,
            seminarType: {},
            dataLoading: true
        };
    }

    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getType, this.state.id);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let type = {
                    key: data.id,    
                    name: data.name,
                    remarks: data.remarks,
                    section: data.section,
                    category: data.category,
                    legacy_id: data.legacy_id,
                    goals: data.goals,
                    types_roles: data.types_roles,
                };
                //console.log(method);
              
                // display loaded methods and remove loading-animation
                this.setState({
                    seminarType: type,
                    dataLoading: false
                });
            });
    }

    /**
     * render method
     * @return {ReactElement} markup
     */
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>Detail des Seminartyp {this.state.seminarType.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div className="DetailLable">Beschreibung:</div>
                    </Col>
                    <Col span={20}>
                        <div>{this.state.seminarType.remarks}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div className="DetailLable">Bereich:</div>
                    </Col>
                    <Col span={20}>
                        <div>{this.state.seminarType.section}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div className="DetailLable">Kategorie:</div>
                    </Col>
                    <Col span={20}>
                        <div>{this.state.seminarType.category}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div className="DetailLable">Ziehle:</div>
                    </Col>
                    <Col span={20}>
                        <Table columns={goalColumns} dataSource={this.state.seminarType.goals} loading={this.state.dataLoading} />
                    </Col>
                </Row>
            </div>
        );
    }
}
TypesDetailContainer.displayName = 'Seminarziehle Overview Container';