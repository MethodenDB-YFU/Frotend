import React, { Component } from 'react';
import { Tabs } from 'antd';
import { TypesOverviewContainer} from './types-overview-container';
import { GoalsOverviewContainer} from './goals-overview-container';
import { RolesOverviewContainer} from './roles-overview-container';


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
                    <TabPane tab="Seminarziele" key="2"><GoalsOverviewContainer /></TabPane>
                    <TabPane tab="Seminarrollen" key="3"><RolesOverviewContainer /></TabPane>
                </Tabs>
            </div>
        );
    }
}