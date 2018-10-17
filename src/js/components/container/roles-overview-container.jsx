import React, { Component } from 'react';
import { Row, Col, Input, Table, Tag } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';



/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class RolesOverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            roles: [],
            role_types: [],
            tableLoading: true
        };
    }
  
    /**
   * loading all methods when method overview is loaded
   */
    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getRoles);
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
                
                // filter duplicate values
                let role_types = [ ... new Set(roles.map(item => item.role_type))];

                // display loaded methods and remove loading-animation
                this.setState({
                    roles: roles,
                    role_types: role_types,
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
         * @type {Array.<{title:string, dataIndex:string, key:string, render: (text: any, record: T, index: number) => ReactNode>}
         */
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name < b.name ? -1 : 1,
        }, {
            title: 'Rollen Typ',
            dataIndex: 'role_type',
            key: 'role_type',
            filters: this.state.role_types.map(item => ({text: item, value: item})),
            sorter: (a, b) => a.role_type < b.role_type ? -1 : 1,
            onFilter: (value, record) => record.role_type.indexOf(value) === 0,
            render: role_type => (
                <span>
                    {<Tag color="#642869" key={role_type}>{role_type}</Tag>}
                </span>
            )
        }];

        /**
       * @type {ReactElement}
       */      
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h1>Seminarollen Übersicht</h1>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="Leiter" addonBefore='Suche' />
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.roles} loading={this.state.tableLoading} size="small"/>
            </div>
        );
    }
}

RolesOverviewContainer.displayName = 'Seminarrollen Overview Container';