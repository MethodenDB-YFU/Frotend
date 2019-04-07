import React, { Component } from 'react';
import { Row, Col, Input, Table, Tag } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';
import { tableHelpers } from '../../helpers';

const Search = Input.Search;

const translations = {
    name: 'Name',
    role_type: 'Rollen Typ',
    page_title: 'Seminar Rollen',
    search_placeholder: 'Leiter',
    search_prefix: 'Suche',
};

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

        this.handleSearch = this.handleSearch.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    handleSearch(searchText) {
        const filtered = tableHelpers.filterByName(searchText, this.state.roles);
        this.updateData(filtered);
    };

    updateData(newData) {
        // filter duplicate values
        let role_types = [ ... new Set(newData.map(item => item.role_type))];

        this.setState({
            data: newData,
            role_types: role_types
        });
    };
  
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
                    return {
                        key: role.id,
                        name: role.name,
                        role_type: role.role_type
                    };
                });
                
                this.updateData(roles);

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
        const columns = [{
            title: translations.name,
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name < b.name ? -1 : 1,
        }, {
            title: translations.role_type,
            dataIndex: 'role_type',
            key: 'role_type',
            filters: this.state.role_types.map(item => ({text: item, value: item})),
            sorter: (a, b) => a.role_type < b.role_type ? -1 : 1,
            onFilter: (value, record) => record.role_type.indexOf(value) === 0,
            render: role_type => (
                <span>
                    {<Tag key={role_type}>{role_type}</Tag>}
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
                        <h1>{translations.page_title}</h1>
                    </Col>
                    <Col span={12}>
                        <Search
                            placeholder={translations.search_placeholder}
                            addonBefore={translations.search_prefix}
                            onSearch={this.handleSearch}/>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.data} loading={this.state.tableLoading} size="small"/>
            </div>
        );
    }
}

RolesOverviewContainer.displayName = 'Seminar Roles Overview Container';