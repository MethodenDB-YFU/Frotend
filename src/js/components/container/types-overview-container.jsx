import React, { Component } from 'react';
import { Row, Col, Input, Table, Badge } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

/**
 * @type {Array.<{title:string, dataIndex:string, key:string, render: (text: any, record: T, index: number) => ReactNode>}
 */

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class TypesOverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            types: [],
            categories: [],
            sections: [],
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
                let types = data.map((type) => {
                    let methodJson = {
                        key: type.id,
                        name: type.name,
                        category: type.category ? type.category : 'Unbekannt',
                        section: type.section ? type.section : 'Unbekannt'
                    };
                    return methodJson;
                });

                // filter duplicate values
                let sections = [ ... new Set(types.map(item => item.section))];
                let categories = [... new Set(types.map(item => item.category))]; 

                // display loaded methods and remove loading-animation
                this.setState({
                    types: types,
                    categories: categories.sort(),
                    sections: sections.sort(),
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a,b) => a.name < b.name ? -1 : 1
            // render: (text, record) => <Link to={'/types/show/'+record.key}>{text}</Link>
        }, {
            title: 'Kategorie',
            dataIndex: 'category',
            key: 'category',
            filters: this.state.categories.map(item => ({text: item, value: item})),
            sorter: (a, b) => a.category < b.category ? -1 : 1,
            onFilter: (value, record) => record.category.indexOf(value) === 0,

        }, {
            title: 'Section',
            dataIndex: 'section',
            key: 'section',
            filters: this.state.sections.map(item => ({text: item, value: item})),
            sorter: (a, b) => a.section < b.section ? -1 : 1,
            onFilter: (value, record) => record.section.indexOf(value) === 0,
        }
        ];

        /**
       * @type {ReactElement}
       */
        // const createBtn = (<Link to="/method/new">Type erstellen</Link>);
      
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h1>Seminartypen Übersicht</h1>
                    </Col>
                    <Col span={12}>
                        <Input placeholder="VBT" addonBefore="Suche" onChange={this.handleFilter}/>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.types} loading={this.state.tableLoading} size="small"/>
            </div>
        );
    }
}

TypesOverviewContainer.displayName = 'Seminartypes Overview Container';