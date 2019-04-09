import React, { Component } from 'react';
import {Tabs} from 'antd';
import { AttachmentEditor } from './attachment-editor';
import {translations} from '../../translations';
import {addAttribute, getAttribute, containsAttribute, updateAttribute} from '../../helpers';
import v4 from 'uuid';

const TabPane = Tabs.TabPane;

const newAttachment = [{
    id: 'active',
    title: translations.create_attachment,
    content: {
        blocks: [{
            type: 'header',
            data: {
                text: 'Neuer Anhang',
                level: 1
            }
        }]
    },
}];

/**
 * form field to add attachments to the method like graphics or texts
 * @extends Component
 */
export class MethodAttachmentField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attachments: [],
            current: {},
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.onTabPaneClick = this.onTabPaneClick.bind(this);
    }

    /**
     * if new attachment is clicked we need to handle
     * a) creation of a new key
     * b) insertion of new attachment into master list
     * @param key
     */
    onTabPaneClick(key) {
        if (key === 'new') {
            let current = this.state.current;
            current.id = v4();

            let attachments = this.state.attachments;
            attachments = containsAttribute(attachments, current)
                ? updateAttribute(attachments, current)
                : addAttribute(attachments, current);

            this.setState({
                attachments: attachments,
                current: newAttachment[0]
            });
        } else {
            const current = getAttribute(this.state.attachments, key);
            this.setState({
                current: current,
            });
        }
    }

    /**
     * @param attachment
     */
    handleUpdate(attachment) {
        console.log(this.state);
        // let attachments = this.state.attachments;
        // attachments = containsAttribute(attachments, attachment)
        //     ? updateAttribute(attachments, attachment)
        //     : addAttribute(attachments, attachment);

        this.setState({
            current: attachment
        });
    }

    /**
     * @todo modify for update, i.e. figure out if current should really be newAttachment all the time.
     */
    componentDidMount() {
        this.setState({
            attachments: this.props.status.attachments,
            current: newAttachment[0],
        });
    }

    /**
     * before component unmounts we need to make sure, all attachments have a UUID as ID and are appended to master list
     */
    componentWillUnmount() {
        this.props.status.attachments = this.state.attachments;
        this.props.handleForm(this.props.status);
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {

        return (
            <div className={this.props.className}>
                <Tabs
                    defaultActiveKey={newAttachment[0].id}
                    activeKey={this.state.current.id}
                    tabPosition='left'
                    onTabClick={this.onTabPaneClick.bind(this)}
                >
                    {
                        this.state.attachments.map((att) => {
                            if (att.id === this.state.current.id) { return false; };
                            return (
                                <TabPane tab={att.title} key={att.id}>
                                    <AttachmentEditor data={att} handleUpdate={this.handleUpdate}/>
                                </TabPane>
                            );
                        }

                        )
                    }
                    <TabPane tab={this.state.current.title} key={newAttachment[0].id}>
                        <AttachmentEditor data={newAttachment[0]} handleUpdate={this.handleUpdate}/>
                    </TabPane>
                    <TabPane tab={translations.create_attachment} key='new'/>
                </Tabs>
            </div>
        );
    }
}