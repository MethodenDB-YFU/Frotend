import React, { Component } from 'react';
import { Tabs } from 'antd';
import { translations } from '../../../translations';
import { addAttribute, updateAttribute, delAttribute, getAttribute } from '../../../helpers';
import { TitleContentEditor } from '../shared/title-content-editor';
import v4 from 'uuid';

const TabPane = Tabs.TabPane;

/**
 * form field to add attachments to the method like graphics or texts
 * @extends Component
 */
export class AttachmentEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attachments: this.props.method.attachments,
            active: '',
        };

        this.onTabPaneClick = this.onTabPaneClick.bind(this);
        this.onTabPaneEdit = this.onTabPaneEdit.bind(this);
        this.addAttachment = this.addAttachment.bind(this);
        this.removeAttachment = this.removeAttachment.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    onTabPaneEdit(key, action) {
        switch (action) {
        case 'add':
            this.addAttachment();
            break;
        case 'remove':
            this.removeAttachment(key);
            break;
        }
    }

    addAttachment() {
        const active = v4();
        const attachment = {
            id: active,
            title: translations.add_attachment,
            content: {
                blocks: [{
                    type: 'header',
                    data: {
                        text: translations.new_attachment,
                        level: 1
                    }
                }]
            }
        };

        const attachments = addAttribute(this.state.attachments, attachment);

        this.setState({attachments, active});
    }

    removeAttachment(key) {
        const attachment = getAttribute(this.state.attachments, key);
        const attachments = delAttribute(this.state.attachments, attachment);
        this.setState({attachments});
    }

    onTabPaneClick(active) {
        this.setState({active});
    }

    /**
     * @param attachment
     */
    handleUpdate(attachment) {
        const attachments = updateAttribute(this.state.attachments, attachment);
        this.setState({attachments});
    }

    componentWillUnmount() {
        let method = this.props.method;
        method.attachments = this.state.attachments;
        this.props.handleForm(method);
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
                    activeKey={this.state.active}
                    tabPosition='left'
                    onChange={this.onTabPaneClick}
                    onEdit={this.onTabPaneEdit}
                    type='editable-card'
                    tabBarStyle={{minWidth: '180px'}}>
                    {
                        this.state.attachments.map((attachment) => <TabPane tab={attachment.title} key={attachment.id}>
                            <TitleContentEditor
                                id={attachment.id}
                                key={attachment.id}
                                title={attachment.title}
                                content={attachment.content}
                                handleUpdate={this.handleUpdate}
                            />
                        </TabPane>)
                    }
                </Tabs>
            </div>
        );
    }
}