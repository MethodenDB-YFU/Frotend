import React, { Component } from 'react';
import { Steps, Row, Col, Form, Button, Icon } from 'antd';
import { MethodAttributeFields } from '../partials/method-attribute-fields';
import { MethodContentField } from '../partials/method-content-field';
import { MethodAttachmentField } from '../partials/method-attachment-field';

/**
 * @type {Steps.Step}
 */
const Step = Steps.Step;

const steps = [{
    title: 'Inhalt',
    content: <MethodContentField/>,
    icon: 'form'
}, {
    title: 'Anhänge',
    content: <MethodAttachmentField/>,
    icon: 'book'
}, {
    title: 'Metadaten',
    content: <MethodAttributeFields/>,
    icon: 'tags'
}];

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
    nextStep() {
        // e.preventDefault();
        const currentStep = this.state.currentStep + 1;
        
        this.setState({currentStep: currentStep});
    }
    
    /**
     * navigating one step back in the method form
     * @param {MouseEvent} e 
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
                            {steps.map(item => <Step key={item.title} title={item.title} icon={<Icon type={item.icon} theme="outlined" />} />)}
                        </Steps>
                    </Col>
                </Row>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <div className="steps-content">{steps[currentStep].content}</div>
                </Form>
                <div className="steps-action">
                    {
                        currentStep < steps.length - 1
                        && <Button type="primary" onClick={() => this.nextStep()}>Weiter</Button>
                    }
                    {
                        currentStep === steps.length - 1
                        && <Button type="primary" onClick={() => console.log('Processing complete!')}>Speichern</Button>
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
            </div>
        );
    }
}

/**
 * container for the method form
 * @type Form
 */
export const MethodFormContainer = Form.create()(MethodForm);