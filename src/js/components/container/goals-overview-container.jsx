import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col, Input, Table, Badge, Icon, Tooltip } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

const Search = Input.Search;

/**
 * @type {Array.<{title:string, dataIndex:string, key:string, render: (text: any, record: T, index: number) => ReactNode>}
 */
const columns = [{
    title: <Tooltip title="Verpflichtend"><Icon type="key" theme="outlined" /></Tooltip>,
    dataIndex: 'required',
    key: 'required',
    width: 40,
    render: (required) => <span><Badge status={required ? 'error' : 'success'} /></span>,
}, {
    title: 'Name',
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
        const filtered = this.state.goals.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
        this.updateData(filtered);
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
                        <h1>Seminarziele Übersicht</h1>
                    </Col>
                    <Col span={12}>
                        <Search placeholder="Kommunikation" addonBefore='Suche' onSearch={this.handleSearch}/>
                    </Col>
                </Row>
                <Table columns={columns} expandedRowRender={goal => <p style={{ margin: 0 }}> {goal.explanation || 'Hier könnte eine Erklärung stehen.'}</p>} dataSource={this.state.data} loading={this.state.tableLoading} size="small"/>
            </div>
        );
    }
}

GoalsOverviewContainer.displayName = 'Seminarziele Overview Container';