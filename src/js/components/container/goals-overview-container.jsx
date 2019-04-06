import React, { Component } from 'react';
import { Row, Col, Input, Table, Badge, Icon, Tooltip } from 'antd';
import { urlHelper } from '../../helpers';
import { urlConstants } from '../../constants';
import { tableHelpers } from '../../helpers';

const Search = Input.Search;

//@todo figure out how to move to different file!
const translations = {
    search_placeholder: 'Kommunikation',
    search_prefix: 'Suche',
    page_title: 'Seminarziele Übersicht',
    required: 'Verpflichtend',
    name: 'Name',
    explanation_placeholder: 'Hier könnte eine Erklärung stehen.',
};


/**
 * @type {Array.<{title:string, dataIndex:string, key:string, width:integer, render: (text: any, record: T, index: number) => ReactNode>}
 */
const columns = [{
    title: <Tooltip title={ translations.required }><Icon type="key" theme="outlined" /></Tooltip>,
    dataIndex: 'required',
    key: 'required',
    width: 40,
    render: (required) => <span><Badge status={required ? 'error' : 'success'} /></span>,
}, {
    title: translations.name,
    dataIndex: 'name',
    key: 'name',
    sorter: (a,b) => a.name < b.name ? -1 : 1
}];

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class GoalsOverviewContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            goals: [],
            tableLoading: true
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    handleSearch(searchText) {
        this.updateData(tableHelpers.filterByName(searchText, this.state.goals));
    };

    updateData(newData) {
        this.setState({
            data: newData,
        });
    };
  
    /**
   * loading all methods when method overview is loaded
   */
    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getGoals);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let goals = data.map((goal) => {
                    let methodJson = {
                        key: goal.id,
                        name: goal.name,
                        explanation: goal.explanation,
                        required: goal.required
                    };
                    return methodJson;
                });

                this.updateData(goals);
                                
                // display loaded methods and remove loading-animation
                this.setState({
                    goals: goals,
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
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h1>{ translations.page_title }</h1>
                    </Col>
                    <Col span={12}>
                        <Search
                            placeholder={ translations.search_placeholder }
                            addonBefore={ translations.search_prefix }
                            onSearch={this.handleSearch}/>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    expandedRowRender={goal => <p style={{ margin: 0 }}> {goal.explanation || translations.explanation_placeholder}</p>}
                    dataSource={this.state.data}
                    loading={this.state.tableLoading}
                    size="small"/>
            </div>
        );
    }
}

GoalsOverviewContainer.displayName = 'Seminar Goals Overview Container';