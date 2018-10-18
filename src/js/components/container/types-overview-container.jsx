import React, { Component } from 'react';
import { Row, Col, Input, Table } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

const Search = Input.Search;

/**
 * @type {Array.<{title:string, dataIndex:string, key:string, render: (text: any, record: T, index: number) => ReactNode>}
 */


// const expandedRowRender = () => {
//     const columns = [{
//         title: 'Required',
//         key: 'required',
//         render: () => <span><Badge status="error" /></span>
//     }, {
//         title: 'Name', 
//         dataIndex: 'name',
//         key: 'name'
//     }, {
//         title: 'Beschreibung',
//         dataIndex: 'explanation',
//         key: 'explanation'
//     }];

//     const data = [];
//     for (let i = 0; i<4; i++) {
//         data.push({
//             key: i,
//             name: 'Ziel',
//             required: (i % 2 == 0) ? true : false,
//             explanation: 'Foo bar lah blah'
//         });
//     }

//     return(
//         <Table
//             columns={columns}
//             dataSource={data}
//             pagination={false}
//             scroll={{y:100}}
//             size="small"
//         />
//     ); 
// };

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
        // console.log(searchText);
        // this.setState({searchText: searchText});

        const filtered = this.state.types.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
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
                        category: type.category ? type.category : 'Unbekannt',
                        section: type.section ? type.section : 'Unbekannt'
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a,b) => a.name < b.name ? -1 : 1
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
        }];

        /**
         * @type {ReactElement}
         */
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h1>Seminartypen Übersicht</h1>
                    </Col>
                    <Col span={12}>
                        <Search 
                            placeholder="VBT" 
                            addonBefore="Suche" 
                            onSearch={this.handleSearch}/>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.data} loading={this.state.tableLoading} size="small"/>
            </div>
        );
    }
}

TypesOverviewContainer.displayName = 'Seminartypes Overview Container';