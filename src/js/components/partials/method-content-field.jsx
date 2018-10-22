import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const FormItem = Form.Item;

/**
 * form field to add the important content of the method
 * @extends Component
 */
export class MethodContentField extends Component {
    constructor(props) {
        super(props);
        
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }
    
    /**
     * TinyMCE creates an iframe and doesn't copy the written content to the hidden textarea which React sees,
     * so we copy the written content when ever something changes in the editor
     */
    handleEditorChange(e) {
        document.getElementById('methodDescription').value = e.target.getContent();
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        // const {getFieldDecorator } = this.props.form;
        
        return (
            <div className={this.props.className}>
                <Row>
                    <Col span={24}>
                        <FormItem label="Methodenname">
                            <Input placeholder="Methodenname" size="large"/>
                        </FormItem>
                        <FormItem>
                            <Editor
                                init={{
                                    plugins: 'autolink image link lists paste table',
                                    menubar: '',
                                    toolbar: 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist indent outdent | link image | table',
                                    height: 400,
                                    content_css: '/css/paper-layout.css',
                                    body_class: 'paper-style',
                                    style_formats: [
                                        { title: 'Heading 1', block: 'h1' },
                                        { title: 'Heading 2', block: 'h2' },
                                        { title: 'Heading 3', block: 'h3' },
                                        { title: 'Text', block: 'p' }
                                    ],
                                    statusbar: false
                                }}
                                onChange={this.handleEditorChange}
                            />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}