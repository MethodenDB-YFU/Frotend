import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Table, Tag } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class OverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            levels: [],
            types: [],
            data: [],
            methods: [],
            tableLoading: true
        };

        this.updateData = this.updateData.bind(this);
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
            .catch((error) => {
                console.error('Foo', error);
            })
            .then(data => {
                let methods = data.map((method) => {
                    let methodJson = {
                        key: method.id,
                        name: method.title,
                        seminar: method.seminar_type,
                        types: method.method_types,
                        levels: method.method_levels,
                        attachments: method.attachments,
                        goals: method.seminar_goals
                    };
                    return methodJson;
                });
                
                // display loaded methods and remove loading-animation
                this.setState({
                    methods: methods,
                    tableLoading: false
                });
                this.updateData(methods);
            })
            .catch((error) => {
                console.error('Fetch Error =\n', error);
            });

    }

    updateData(newData) {
        // filter duplicate values
        let types = [ ... new Set(newData.flatMap(item => item.types.map(item => item.name)))];
        let levels = [... new Set(newData.flatMap(item => item.levels.map(item => item.name)))]; 

        this.setState({
            data: newData,
            types: types.sort((a, b) => b.name - a.name),
            levels: levels.sort((a, b) => b.name - a.name)
        });
    };

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
            render: (text, record) => <Link to={'/method/show/'+record.key}>{text}</Link>,
            sorter: (a, b) => a.name < b.name ? -1 : 1,
            onFilter: (value, record) => record.name.indexOf(value) === 0
        }, {
            title: 'Typ',
            dataIndex: 'types',
            key: 'types',
            filters: this.state.types.map(item => ({text: item, value: item})),
            render: (tags) => (
                <span>
                    {tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
                </span>
            )
        }, {
            //ToDo: Render Icon with Tooltip that shows attachment titles.
            title: 'Level',
            dataIndex: 'levels',
            key: 'levels',
            render: (tags) => (
                <span>
                    {tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
                </span>
            )
        }, {
            title: 'Anhänge',
            dataIndex: 'attachments',
            key: 'attachments', 
            render: (attachments) => (
                <span>
                    {attachments.size}
                </span>
            )
        }];
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
                <Table columns={columns} dataSource={this.state.data} loading={this.state.tableLoading} />
            </div>
        );
    }
}

OverviewContainer.displayName = 'Method Overview Container';