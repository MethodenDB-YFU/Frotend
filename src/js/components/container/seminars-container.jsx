import React, { Component } from 'react';
import { Tabs } from 'antd';
import { history } from '../../helpers';
import { TypesOverviewContainer} from './types-overview-container';
import { GoalsOverviewContainer} from './goals-overview-container';
import { RolesOverviewContainer} from './roles-overview-container';
import { translations } from '../../translations';

const TabPane = Tabs.TabPane;

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class SeminarsContainer extends Component {
    constructor(props) {
        super(props);

        this.onTabPaneClick = this.onTabPaneClick.bind(this);

    }

    onTabPaneClick(key) {
        switch (key) {
        case 'type':
            history.push('/seminar/type');
            break;
        case 'goal':
            history.push('/seminar/goal');
            break;
        case 'role':
            history.push('/seminar/role');
            break;
        }
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
                    defaultActiveKey={this.props.activeTab}
                    tabPosition='left'
                    onTabClick={this.onTabPaneClick.bind(this)}
                >
                    <TabPane tab={translations.seminar_types} key="type"><TypesOverviewContainer /></TabPane>
                    <TabPane tab={translations.seminar_goals} key="goal"><GoalsOverviewContainer /></TabPane>
                    <TabPane tab={translations.seminar_roles} key="role"><RolesOverviewContainer /></TabPane>
                </Tabs>
            </div>
        );
    }
}