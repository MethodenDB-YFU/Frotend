import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import { TypesOverviewContainer} from './types-overview-container';


const TabPane = Tabs.TabPane;

/**
 * @type {Array.<{title:string, dataIndex:string, key:string, render: (text: any, record: T, index: number) => ReactNode>}
 */

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class SeminarsContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            types: [],
            tableLoading: true
        };
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
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                >
                    <TabPane tab="Seminartypen" key="1"><TypesOverviewContainer /></TabPane>
                    <TabPane tab="Seminarziele" key="2">Content of tab 2</TabPane>
                    <TabPane tab="Seminarrollen" key="3">Content of tab 3</TabPane>
                </Tabs>
            </div>
        );
    }
}