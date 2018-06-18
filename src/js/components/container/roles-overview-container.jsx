import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Table } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

/**
 * @type {Array.<{title:string, dataIndex:string, key:string, render: (text: any, record: T, index: number) => ReactNode>}
 */
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={'/roles/show/'+record.key}>{text}</Link>
}, {
    title: 'Rollen Typ',
    dataIndex: 'role_type',
    key: 'role_type'
}];

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class RolesOverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            roles: [],
            tableLoading: true
        };
    }
  
    /**
   * loading all methods when method overview is loaded
   */
    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getTypes);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let roles = data.map((role) => {
                    let methodJson = {
                        key: role.id,
                        name: role.name,
                        role_type: role.role_type
                    };
                    return methodJson;
                });
                
                // display loaded methods and remove loading-animation
                this.setState({
                    roles: roles,
                    tableLoading: false
                });
            });
    }

    /**
   * render method
   * @return {ReactElement} markup
   * @private
   */
    render() {
        /**
       * @type {ReactElement}
       */
        const createBtn = (<Link to="/roles/new">Rolle erstellen</Link>);
      
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h1>Seminarollen Übersicht</h1>
                    </Col>
                    <Col span={12}>
                        <Input size="large" placeholder="Leiter" addonAfter={createBtn} />
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.roles} loading={this.state.tableLoading} />
            </div>
        );
    }
}

RolesOverviewContainer.displayName = 'Seminarrollen Overview Container';