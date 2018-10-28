import React, { Component } from 'react';
import { Steps, Row, Col, Form, Button, Icon } from 'antd';
import { MethodAttributeFields } from '../partials/method-attribute-fields';
import { MethodContentField } from '../partials/method-content-field';
import { MethodAttachmentField } from '../partials/method-attachment-field';
import { MethodSummary } from '../partials/method-summary';
import { urlHelper } from '../../helpers';
import { urlConstants } from '../../constants';

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
            currentStep: 0,
            method: {
                attachments: [],
                title: '',
                content: '',
                seminarType: '',
                seminarGoals: [],
                methodLevels: [],
                methodTypes: []
            }
        };
        
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.handleMethodContent = this.handleMethodContent.bind(this);
        this.handleMethodAttributes = this.handleMethodAttributes.bind(this);
        this.handleAttachments = this.handleAttachments.bind(this);
        this.saveMethod = this.saveMethod.bind(this);
        this.buildPayload = this.buildPayload.bind(this);
    }

    /**
     * initialy disables submit button
     */
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleMethodContent(content) {
        let method = this.state.method;
        method.title = content.title;
        method.content = content.content;
        this.setState({
            method: method
        });
    }

    handleAttachments(attachments) {
        let method = this.state.method;
        method.attachments = attachments.attachments;
        this.setState({
            method: method
        });
    }

    handleMethodAttributes(attributes) {
        let method = this.state.method;
        method.seminarType = attributes.seminarType;
        method.seminarGoals = attributes.seminarGoals;
        method.methodLevels = attributes.methodLevels;
        method.methodTypes = attributes.methodTypes;
        this.setState({
            method: method
        });
    }

    handleForm() {
    }

    buildPayload() {
        return {
            attachments: this.state.method.attachments,
            title: this.state.method.title,
            content: this.state.method.content,
            seminar_type: this.state.method.seminarType.id,
            seminar_goals: this.state.method.seminarGoals.map((item) => item.id),
            method_levels: this.state.method.methodLevels,
            method_types: this.state.method.methodTypes
        };
    }

    saveMethod() {
        const payload = this.buildPayload();

        let fetchParams = urlHelper.buildFetchParams(urlConstants.createMethod, '', payload);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
            });
    }
    
    /**
     * navigating one step forward in the method form
     */
    nextStep() {
        // e.preventDefault();
        const currentStep = this.state.currentStep + 1;
        
        this.setState({currentStep: currentStep});
    }
    
    /**
     * navigating one step back in the method form
     */
    prevStep() {
        // e.preventDefault();
        const currentStep = this.state.currentStep - 1;
        
        this.setState({currentStep: currentStep});
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
        const { currentStep } = this.state;

        const steps = [{
            title: 'Inhalt',
            content: <MethodContentField handleForm={this.handleMethodContent} status={this.state.method}/>,
            icon: 'form'
        }, {
            title: 'Anhänge',
            content: <MethodAttachmentField handleForm={this.handleAttachments} status={this.state.method}/>,
            icon: 'book'
        }, {
            title: 'Metadaten',
            content: <MethodAttributeFields handleForm={this.handleMethodAttributes} status={this.state.method}/>,
            icon: 'tags'
        }, {
            title: 'Zusammenfassung',
            content: <MethodSummary status={this.state.method}/>,
            icon: 'eye'
        }];
        
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>Neue Methode erstellen</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={14} offset={5}>
                        <Steps current={currentStep}>
                            {steps.map(item => <Step key={item.title} title={item.title} icon={<Icon type={item.icon} theme="outlined" />} />)}
                        </Steps>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <div className="steps-content">{steps[currentStep].content}</div>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="steps-action">
                            {
                                currentStep < steps.length - 1
                                && <Button type="primary" onClick={() => this.nextStep()}>Weiter</Button>
                            }
                            {
                                currentStep === steps.length - 1
                                && <Button type="primary" onClick={() => this.saveMethod()}>Speichern</Button>
                            }
                            {
                                currentStep > 0
                                && (
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prevStep()}>
                                    Zurück
                                    </Button>
                                )
                            }                   
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

/**
 * container for the method form
 * @type Form
 */
export const MethodFormContainer = Form.create()(MethodForm);