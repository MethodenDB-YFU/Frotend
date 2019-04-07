import React, { Component } from 'react';
import { Row, Col, Input, Table } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';
import { utils } from '../../helpers';
import { translations } from '../../translations';

const Search = Input.Search;

Object.assign(translations, {
    page_title: 'Seminartypen',
    search_placeholder: 'VBT',
});

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
            tableLoading: true,
            searchText: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    handleSearch(searchText) {
        const filtered = utils.filterByName(searchText, this.state.types);
        this.updateData(filtered);
    };

    updateData(newData) {
        // filter duplicate values
        let sections = [ ... new Set(newData.map(item => item.section))];
        let categories = [... new Set(newData.map(item => item.category))]; 

        this.setState({
            data: newData,
            categories: categories.sort(),
            sections: sections.sort(),
        });
    };
  
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
                        category: type.category || translations.unknown,
                        section: type.section || translations.unknown
                    };
                    return methodJson;
                });

                this.updateData(types);

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

        const columns = [{
            title: translations.name,
            dataIndex: 'name',
            key: 'name',
            sorter: (a,b) => a.name < b.name ? -1 : 1
        }, {
            title: translations.category,
            dataIndex: 'category',
            key: 'category',
            filters: this.state.categories.map(item => ({text: item, value: item})),
            sorter: (a, b) => a.category < b.category ? -1 : 1,
            onFilter: (value, record) => record.category.indexOf(value) === 0,

        }, {
            title: translations.section,
            dataIndex: 'section',
            key: 'section',
            filters: this.state.sections.map(item => ({text: item, value: item})),
            sorter: (a, b) => a.section < b.section ? -1 : 1,
            onFilter: (value, record) => record.section.indexOf(value) === 0,
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

TypesOverviewContainer.displayName = 'Seminar Types Overview Container';