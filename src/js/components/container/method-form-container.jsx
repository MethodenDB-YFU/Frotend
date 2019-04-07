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

//@todo figure out how to move to different file!
const translations = {
    step_content: 'Inhalt',
    step_attachments: 'Anänge',
    step_metadata: 'Metadaten',
    step_summary: 'Zusammenfassung',
    page_title: 'Neue Methode Erstellen',
    next: 'Weiter',
    previous: 'Zurück',
    save: 'Speichern',
};

const buildPayload = (data) => {
    return {
        attachments: data.attachments,
        title: data.title,
        content: data.content,
        seminar_type: data.seminarType.id,
        seminar_goals: data.seminarGoals.map((item) => item.id),
        method_levels: data.methodLevels,
        method_types: data.methodTypes
    };
};

/**
 * form to generate a new method
 * @extends Component
 * @todo maybe extend class to also edit a method
 */
export class MethodForm extends Component {
    constructor(props) {
        super(props);
        
        /**
         * @property {number} currentStep set step in form
         * @method {object} method object that's being worked on
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
        this.handleUpdate = this.handleUpdate.bind(this);
        this.saveMethod = this.saveMethod.bind(this);
    }

    /**
     * initialy disables submit button
     * @todo figure out if this is still needed
     */
    componentDidMount() {
        //this.props.form.validateFields();
    }

    handleUpdate(method) {
        this.setState({
            method: method,
        });
    }

    //@todo backend changes needed (X-User-ID header)
    saveMethod() {
        const payload = buildPayload(this.state.method);
        let fetchParams = urlHelper.buildFetchParams(urlConstants.createMethod, '', payload);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
            });
    }

    nextStep() {
        const currentStep = this.state.currentStep + 1;
        this.setState({currentStep: currentStep});
    }

    prevStep() {
        const currentStep = this.state.currentStep - 1;
        this.setState({currentStep: currentStep});
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

        //@todo how to create documentation for this?
        const steps = [{
            title: translations.step_content,
            content: <MethodContentField handleForm={this.handleUpdate} status={this.state.method}/>,
            icon: 'form'
        }, {
            title: translations.step_attachments,
            content: <MethodAttachmentField handleForm={this.handleUpdate} status={this.state.method}/>,
            icon: 'book'
        }, {
            title: translations.step_metadata,
            content: <MethodAttributeFields handleForm={this.handleUpdate} status={this.state.method}/>,
            icon: 'tags'
        }, {
            title: translations.step_summary,
            content: <MethodSummary status={this.state.method}/>,
            icon: 'eye'
        }];
        
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>{ translations.page_title }</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={3}>
                        <Steps current={currentStep}>
                            {
                                steps.map(item =>
                                    <Step
                                        key={item.title}
                                        title={item.title}
                                        icon={<Icon type={item.icon} theme="outlined" />} />)
                            }
                        </Steps>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form layout="vertical">
                            <div className="steps-content">{steps[currentStep].content}</div>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="steps-action">
                            {
                                currentStep < steps.length - 1
                                && <Button
                                    style={{ float: 'right' }}
                                    type="primary"
                                    onClick={() => this.nextStep()}>{translations.next}
                                </Button>
                            }
                            {
                                currentStep === steps.length - 1
                                && <Button
                                    style={{ float: 'right' }}
                                    type="primary"
                                    onClick={() => this.saveMethod()}>{translations.save}
                                </Button>
                            }
                            {
                                currentStep > 0
                                && <Button
                                    style={{ marginLeft: 8 }}
                                    onClick={() => this.prevStep()}>{translations.previous}
                                </Button>
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