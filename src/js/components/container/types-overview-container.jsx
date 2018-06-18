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
    render: (text, record) => <Link to={'/types/show/'+record.key}>{text}</Link>
}, {
    title: 'Category',
    dataIndex: 'category',
    key: 'category'
}, {
    title: 'Section',
    dataIndex: 'section',
    key: 'section'
}];

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class TypesOverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            types: [],
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
                        category: type.category,
                        section: type.section
                    };
                    return methodJson;
                });
                
                // display loaded methods and remove loading-animation
                this.setState({
                    types: types,
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
        const createBtn = (<Link to="/method/new">Type erstellen</Link>);
      
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h1>Seminartypen Übersicht</h1>
                    </Col>
                    <Col span={12}>
                        <Input size="large" placeholder="VBT" addonAfter={createBtn} />
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.types} loading={this.state.tableLoading} />
            </div>
        );
    }
}

TypesOverviewContainer.displayName = 'Seminartypes Overview Container';