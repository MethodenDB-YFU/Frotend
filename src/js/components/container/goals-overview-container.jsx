import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
    //render: (text, record) => <Link to={'/goals/show/'+record.key}>{text}</Link>
}, {
    title: 'Beschreibung',
    dataIndex: 'explanation',
    key: 'explanation'
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
    }
  
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
                        explanation: goal.explanation
                    };
                    return methodJson;
                });
                                
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
                        <Input placeholder="Kommunikation" addonBefore='Suche' />
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.goals} loading={this.state.tableLoading} size="small"/>
            </div>
        );
    }
}

GoalsOverviewContainer.displayName = 'Seminarziehle Overview Container';