import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router-dom';
import { Steps, Row, Col, Form, Button, message } from 'antd';
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
        
        this.state = {
            currentStep: 0
        };
        
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.reqHeader = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-User-ID': 'aa40d8c0-e705-11e7-80c1-9a214cf093ae'
        });
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    
    nextStep(e) {
        e.preventDefault();
        const currentStep = this.state.currentStep;
        
        this.setState({currentStep: currentStep + 1});
    }
    
    prevStep(e) {
        e.preventDefault();
        const currentStep = this.state.currentStep;
        
        this.setState({currentStep: currentStep - 1});
    }
    
    handleSubmit(e) {
        e.preventDefault();        
        this.props.form.setFieldsValue({'methodDescription': document.getElementById('methodDescription').value});
        
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            
            console.log('Received values: ', values);
            
            let method_post = {
                "title": "test",
                "content": "values.methodDescription"
            };
            
            //method_post = values;

            let postMethodReq = new Request('http://localhost:1234/api/methods/', {
                method: 'POST',
                /* headers are important*/
                headers: this.reqHeader,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(method_post)
            });

            fetch(postMethodReq).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Antwort der API war nicht 'Ok'!");
            }).then(data => {
//                this.props.form.resetFields();
                browserHistory.push('/');
//                message.success('Das Ereignis wurde erfolgreich eingetragen!');
            }).catch(error => {
                console.log('Error:' + error);
                message.error('Das Ereignis wurde nicht erstellt. Bitte versuche es später nochmal!');
            });
        });
    }
    
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        
        const {currentStep} = this.state;
        
        const attributeState  = ['', 'hide', 'hide'];
        const contentState    = ['hide', '', 'hide'];
        const attachmentState = ['hide', 'hide', ''];

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
                            <Steps current={currentStep}>
                                <Step title="Metadaten" />
                                <Step title="Inhalt" />
                                <Step title="Anhänge" />
                            </Steps>
                        </Col>
                    </Row>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <MethodAttributeFields
                            className={attributeState[currentStep]}
                            form={this.props.form}
                            nextStep={this.nextStep}
                            prevStep={this.prevStep} />
                        <MethodContentField
                            className={contentState[currentStep]}
                            form={this.props.form}
                            nextStep={this.nextStep}
                            prevStep={this.prevStep} />
                        <MethodAttachmentField
                            className={attachmentState[currentStep]}
                            form={this.props.form}
                            prevStep={this.prevStep} />
                    </Form>
                </div>
                );
    }
}
                
export const MethodFormContainer = Form.create()(MethodForm);