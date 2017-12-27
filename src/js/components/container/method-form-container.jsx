import React, { Component } from 'react';
import { Steps, Row, Col, Form, Button } from 'antd';
import { MethodAttributeFields } from '../partials/method-attribute-fields';
import { MethodContentField } from '../partials/method-content-field';
import { MethodAttachmentField } from '../partials/method-attachment-field';

const FormItem = Form.Item;
const Step = Steps.Step;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class MethodForm extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    
    handleSubmit(e) {
        e.preventDefault();        
        this.props.form.setFieldsValue({'methodDescription': document.getElementById('methodDescription').value});
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            } else {
                console.log('Received error: ', err);
            }
        });
    }
    
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('methodName') && getFieldError('methodName');
        return (
                <div>
                    <Row>
                        <Col span={24}>
                            <h2>Neue Methode erstellen</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10} offset={7}>
                            <Steps current={1}>
                                <Step title="Metadaten" />
                                <Step title="Inhalt" />
                                <Step title="Anhänge" />
                            </Steps>
                        </Col>
                    </Row>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <MethodContentField form={this.props.form} />
                    </Form>
                </div>
                );
    }
}
                
export const MethodFormContainer = Form.create()(MethodForm);