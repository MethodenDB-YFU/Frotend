import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const FormItem = Form.Item;

const translations = {
    method_name: 'Methodenname',
};

const tinymce_config = {
    plugins: 'autolink image link lists paste table',
    menubar: '',
    toolbar: 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist indent outdent | link image | table',
    height: 400,
    style_formats: [
        { title: 'Heading 1', block: 'h1' },
        { title: 'Heading 2', block: 'h2' },
        { title: 'Heading 3', block: 'h3' },
        { title: 'Text', block: 'p' }
    ],
    statusbar: false
};

/**
 * form field to add the important content of the method
 * @extends Component
 */
export class MethodContentField extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            content: ''
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    
    /**
     * TinyMCE creates an iframe and doesn't copy the written content to the hidden textarea which React sees,
     * so we copy the written content when ever something changes in the editor
     */
    handleEditorChange(e) {
        this.setState({
            content: e.target.getContent()
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

    componentDidMount() {
        this.setState({
            title: this.props.status.title,
            content: this.props.status.content
        });
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
                <Row>
                    <Col span={24}>
                        <FormItem label={translations.method_name}>
                            <Input
                                placeholder={translations.method_name}
                                value={title} size="large"
                                onChange={this.handleTitleChange}/>
                        </FormItem>
                        <FormItem>
                            <Editor
                                initialValue={content}
                                init={tinymce_config}
                                onChange={this.handleEditorChange}
                            />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}