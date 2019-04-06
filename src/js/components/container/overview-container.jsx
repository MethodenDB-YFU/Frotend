import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Table, Tag, Icon, Tooltip } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';
import { tableHelpers } from '../../helpers';

const Search = Input.Search;

//@todo figure out how to move to different file!
const translations = {
    page_title: 'Methodenübersicht',
    name: 'Name',
    type: 'Typ',
    level: 'Level',
    attachments: 'Anhänge',
    create_method: 'Methode erstellen',
    search_placeholder: 'Albatross',
};

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
        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * loading all methods when method overview is loaded
     */
    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getAllMethods);
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

    handleSearch(searchText) {
        const filtered = tableHelpers.filterByName(searchText, this.state.methods);
        this.updateData(filtered);
    };

    updateData(data) {
        // filter duplicate values so that filters only show available options
        let types = [ ... new Set(data.flatMap(item => item.types.map(item => item.name)))];
        let levels = [... new Set(data.flatMap(item => item.levels.map(item => item.name)))];

        this.setState({
            data: data,
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

        const columns = [{
            title: translations.name,
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={'/method/show/'+record.key}>{text}</Link>,
            sorter: (a, b) => a.name < b.name ? -1 : 1,
            onFilter: (value, record) => record.name.filter(item => item.key == value),
        }, {
            title: translations.type,
            dataIndex: 'types',
            key: 'types',
            filters: this.state.types.map(item => ({text: item, value: item})),
            onFilter: (value, record) => record.types.map(item => item.name === value).includes(true),
            render: (tags) => (
                <span>
                    {tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
                </span>
            )
        }, {
            title: translations.level,
            dataIndex: 'levels',
            key: 'levels',
            filters: this.state.levels.map(item => ({text: item, value: item})),
            onFilter: (value, record) => record.levels.map(item => item.name === value).includes(true),
            render: (tags) => (
                <span>
                    {tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
                </span>
            )
        }, {
            title: translations.attachments,
            dataIndex: 'attachments',
            key: 'attachments', 
            render: (attachments) => (
                <span>
                    {
                        attachments.length > 0 && <Tooltip title={attachments.map(item => item.title).join(', ')}><Icon type="file-add" theme="outlined"/></Tooltip>
                    }
                </span>
            )
        }];
        /**
         * @type {ReactElement}
         */
        const createBtn = (<Link to="/method/new">{translations.create_method}</Link>);
        
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h1>{translations.page_title}</h1>
                    </Col>
                    <Col span={12}>
                        <Search
                            onSearch={this.handleSearch}
                            size="large"
                            placeholder={translations.search_placeholder}
                            addonAfter={createBtn} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                         &nbsp;
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table columns={columns} dataSource={this.state.data} loading={this.state.tableLoading} />
                    </Col>
                </Row>
            </div>
        );
    }
}

OverviewContainer.displayName = 'Method Overview Container';