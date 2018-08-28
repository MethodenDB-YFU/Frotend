import React, { Component } from 'react';
import { Steps, Row, Col, Form, message } from 'antd';
// import { browserHistory } from 'react-router-dom';
import { MethodAttributeFields } from '../partials/method-attribute-fields';
import { MethodContentField } from '../partials/method-content-field';
import { MethodAttachmentField } from '../partials/method-attachment-field';

/**
 * @type {Steps.Step}
 */
const Step = Steps.Step;

/**
 * form to generate a new method
 * @extends Component
 * @todo maybe extend class to also edit a method
 */
export class MethodForm extends Component {
    constructor(props) {
        super(props);
        
        /**
         * @type {object}
         * @property {number} currentStep set step in formular
         */
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

    /**
     * initialy disables submit button
     */
    componentDidMount() {
        this.props.form.validateFields();
    }
    
    /**
     * navigating one step forward in the method form
     * @param {MouseEvent} e 
     */
    nextStep(e) {
        e.preventDefault();
        const currentStep = this.state.currentStep;
        
        this.setState({currentStep: currentStep + 1});
    }
    
    /**
     * navigating one step back in the method form
     * @param {MouseEvent} e 
     */
    prevStep(e) {
        e.preventDefault();
        const currentStep = this.state.currentStep;
        
        this.setState({currentStep: currentStep - 1});
    }
    
    /**
     * handle the steps, when user submits the form
     * @param {MouseEvent} e 
     */
    handleSubmit(e) {
        e.preventDefault();        
        this.props.form.setFieldsValue({'methodDescription': document.getElementById('methodDescription').value});
        
        this.props.form.getFieldValue('keys').forEach((num) => {
            // let attachment = 'attachments[' + num + ']';
            // this.props.form.setFieldsValue({attachment: document.getElementById(attachment).value});
            console.log(this.props.form.getFieldValue('methodAtt[0]') + '; Num:' + num);
            // this.props.form.setFieldsValue({attachment: document.getElementById(attachment).value});
        });
        
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            
            console.log('Received values: ', values);
            
            let method_post = {
                title: values.title,
                content: values.methodDescription,
                seminar_type: {id: values.seminarType},
                seminar_goal: values.seminarGoal,
                method_levels: [{id: values.methodLevel}],
                method_types: [{id: values.methodType}]
            };

            let postMethodReq = new Request('http://localhost:8082/api/methods/', {
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
                throw new Error('Antwort der API war nicht "Ok"!');
            }).then(data => {
                console.log(data);
                // this.props.form.resetFields();
                // browserHistory.push('/');
                message.success('Das Ereignis wurde erfolgreich eingetragen!');
            }).catch(error => {
                console.log('Error:' + error);
                message.error('Das Ereignis wurde nicht erstellt. Bitte versuche es später nochmal!');
            });
        });
    }
    
    /**
     * render method
     * @return {ReactElement} markup
     */
    render() {
        /**
         * @type {number}
         */
        const currentStep = this.state.currentStep;
        /**
         * @type {Array.<string>}
         */
        const attributeState  = ['', 'hide', 'hide'];
        /**
         * @type {Array.<string>}
         */
        const contentState    = ['hide', '', 'hide'];
        /**
         * @type {Array.<string>}
         */
        const attachmentState = ['hide', 'hide', ''];

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

/**
 * container for the method form
 * @type Form
 */
export const MethodFormContainer = Form.create()(MethodForm);