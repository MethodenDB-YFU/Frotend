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
    render: (text, record) => <Link to={'/method/show/'+record.key}>{text}</Link>
//    render: text => <a href="#">{text}</a>
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

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class OverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            methods: [],
            tableLoading: true
        };
    }
    
    /**
     * loading all methods when method overview is loaded
     */
    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getAllMethods);
        //fetch('http://localhost:1234/api/methods')
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            })
            .catch(error => console.error('Fetch Error =\n', error))
            .then(data => {
                let methods = data.map((method) => {
                    let methodJson = {
                        key: method.id,
                        name: method.title,
                        seminar: method.seminar_type.name,
                        typ: method.method_types[0].name,
                        level: method.method_levels[0].name
                    };
                    return methodJson;
                });
                
                // display loaded methods and remove loading-animation
                this.setState({
                    methods: methods,
                    tableLoading: false
                });
            })
            .catch(error => console.error('Fetch Error =\n', error));
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

OverviewContainer.displayName = 'Method Overview Container';