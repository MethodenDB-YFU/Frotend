import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

const FormItem = Form.Item;
const Option = Select.Option;

/**
 * form to generate a new method
 * @extends Component
 * @todo maybe extend class to also edit a method
 */
export class GoalForm extends Component {
    constructor(props) {
        super(props);
        // let goal = {
        this.state = {
            goalName: '',
            explanation: '',
            typeId: '',
            typeName: '',
            seminarTypes: ''
        };
    }

    /**
     * 
     * @param {*} value 
     * @param {*} option 
     */
    onSelectSeminarType(value, option) {
        console.log('handleSeminarTypeSelect:value',value);
        console.log('handleSeminarTypeSelect:option',option);
        this.setState({
            typeId: option.key,
            typeName: option.props.children
        });
    }

    /**
     * 
     * @param {*} value 
     * @param {*} option 
     */
    onDeselectSeminarType(value, option) { //eslint-disable-line no-unused-vars
        this.setState({
            typeId: '',
            typeName: ''
        });
    }

    /**
     * 
     * @param {Object} e 
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const newGoal = {
                    name: values.goalName,
                    explanation: values.explanation,
                    type: {
                        id: values.typeId
                    }
                };
                console.log('newGoal: ', newGoal);
                const fetchParams = urlHelper.buildFetchParams(urlConstants.createGoal,'',newGoal);
                fetch(fetchParams.url, fetchParams.request)
                    .then(response => response.json()).then(data => {
                        console.log('response: ', data);
                    });
            } else {
                console.log('Received error: ', err);
            }
        });
    }

    /**
     * initialy disables submit button
     */
    componentDidMount() {
        this.props.form.validateFields();
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getTypes);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
            let i = 0;
            let seminarTypes = data.map((type) => {
                let options = (
                    <Option key={i} value={type.id}>{type.name}</Option>
                );
                i++;
                return options;
            });
            this.setState({
                seminarTypes: seminarTypes
            });
        });
        this.onSelectSeminarType = this.onSelectSeminarType.bind(this);
        this.onDeselectSeminarType = this.onDeselectSeminarType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    /**
     * render method
     * @return {ReactElement} markup
     */
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>Neues Seminarziel erstellen</h2>
                    </Col>
                </Row>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={24}>
                            <FormItem label="Seminarzielname">
                                {getFieldDecorator('goalName')(
                                    <Input placeholder="Seminarzielname" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="Beschreibung">
                                {getFieldDecorator('explanation')(
                                    <Input placeholder="Beschreibung" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="Seminartype">
                                {getFieldDecorator('typeId')(
                                    <Select
                                        placeholder="Seminar auswählen..."
                                        notFoundContent="Es existieren keine Seminare"
                                        onSelect={this.onSelectSeminarType}
                                        onDeselect={this.onDeselectSeminarType} >
                                        {this.state.seminarTypes}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <Button className="next-step" type="primary" htmlType="submit">Speichern</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

/**
 * container for the method form
 * @type Form
 */
export const GoalFormContainer = Form.create()(GoalForm);
