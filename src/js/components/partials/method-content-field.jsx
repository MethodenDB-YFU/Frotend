import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const FormItem = Form.Item;

export class MethodContentField extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }
    
    handleEditorChange(e) {
        document.getElementById('methodDescription').value = e.target.getContent();
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        
        return (
                <Row>
                    <Col span={24}>
                        <FormItem>
                            {getFieldDecorator('methodDescription')(
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
                            )}
                        </FormItem>
                    </Col>
                </Row>
                );
    }
}