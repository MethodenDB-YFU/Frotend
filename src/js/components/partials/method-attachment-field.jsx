import React, { Component } from 'react';
import { Form, Row, Col, Icon, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const FormItem = Form.Item;
let uuid = 0;

/**
 * form field to add attachments to the method like graphics or texts
 * @extends Component
 */
export class MethodAttachmentField extends Component {
    constructor(props) {
        super(props);
        
        this.removeAttachment = this.removeAttachment.bind(this);
        this.addAttachment = this.addAttachment.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }
    
    removeAttachment(k) {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
    }

    addAttachment() {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys
        });
    }
    
    /**
     * TinyMCE creates an iframe and doesn't copy the written content to the hidden textarea which React sees,
     * so we copy the written content when ever something changes in the editor
     */
    handleEditorChange(e) {
        document.getElementById(e.target.id).value = e.target.getContent();
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k) => {
            return (
                <FormItem required={false} key={k} >
                    {getFieldDecorator(`attachments[${k}]`)(
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
                    <Button type="danger" onClick={() => this.removeAttachment(k)}>
                        <Icon className="dynamic-delete-button" type="minus" /> Anhang entfernen
                    </Button>
                </FormItem>
            );
        });

        return (
            <div className={this.props.className}>
                <Row>
                    <Col span={24}>
                        {formItems}
                        <FormItem>
                            <Button type="dashed" onClick={this.addAttachment}>
                                <Icon type="plus" /> Anhang hinzufügen
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Button className="next-step" type="primary" htmlType="submit">Speichern</Button>
                    <Button onClick={this.props.prevStep}>Zurück</Button>
                </FormItem>
            </div>
        );
    }
}