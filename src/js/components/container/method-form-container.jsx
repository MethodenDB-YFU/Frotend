import React, { Component } from 'react';
import { Steps, Row, Col, Form } from 'antd';
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
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            } else {
                console.log('Received error: ', err);
            }
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
        const currentStep = this.state;
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