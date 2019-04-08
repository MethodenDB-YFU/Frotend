import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Editor } from '../../shared/editor';
import { translations } from '../../translations';

const FormItem = Form.Item;

const content_placeholder = {
    blocks: [
        {
            type: 'header',
            data: {
                text: 'Einleitung',
                level: 1
            }
        }, {
            type: 'paragraph',
            data: {
                text: 'Hier kommt die Beschreibung der Methode mit Bildern ... hin. Ziele kommen erst im nächsten Schritt.'
            }
        }],
    time: 1554662088814,
    version: '2.12.4'
};

/**
 * form field to add the important content of the method
 * @extends Component
 */
export class MethodContentField extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: this.props.status.title,
            content: this.props.status.content || content_placeholder,
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    
    handleEditorChange(content) {
        this.setState({
            content: content,
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    componentWillUnmount() {
        this.props.status.title = this.state.title;
        this.props.status.content = this.state.content;
        this.props.handleForm(this.props.status);
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        const { title, content } = this.state;

        return (
            <div className={this.props.className}>
                <FormItem label={translations.method_name}>
                    <Input
                        placeholder={translations.method_name}
                        value={title} size="large"
                        onChange={this.handleTitleChange}
                    />
                </FormItem>
                <FormItem>
                    <Editor
                        data={content}
                        onChange={this.handleEditorChange}
                    />
                </FormItem>
            </div>
        );
    }
}