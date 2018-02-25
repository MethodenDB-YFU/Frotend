import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, Steps, Input } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;

export class MethodAttributeFields extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

        };
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        
        return (
                <div className={this.props.className}>
                    <Row>
                        <Col span={24}>
                        <FormItem label="Methodenname">
                            {getFieldDecorator('methodName')(
                                <Input placeholder="Methodenname" />
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                        <FormItem label="Seminar">
                            {getFieldDecorator('seminarTyp')(
                                <Select placeholder="Seminar auswählen...">
                                    <Option value="1">VBT</Option>
                                    <Option value="2">NBT</Option>
                                    <Option value="3">ReEntry</Option>
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={8}>
                        <FormItem label="Typ">
                            {getFieldDecorator('methodTyp')(
                                <Select placeholder="Methodentyp auswählen...">
                                    <Option value="1">Diskussion</Option>
                                    <Option value="2">Referat</Option>
                                    <Option value="3">Simulation</Option>
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={8}>
                        <FormItem label="Level">
                            {getFieldDecorator('methodLevel')(
                                <Select placeholder="Level auswählen...">
                                    <Option value="1">Persönlich</Option>
                                    <Option value="2">Theoretisch</Option>
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <FormItem label="Seminarziele">
                            {getFieldDecorator('seminarGoal')(
                                <Select mode="multiple" placeholder="Seminarziel(e) auswählen...">
                                    <Option value="1">Abstrakten Begriff der Anpassung verstehen</Option>
                                    <Option value="2">Zugehörigkeitsgefühl zum Verein schaffen</Option>
                                    <Option value="3">Reflexion der eigenen Werte</Option>
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <Button className="next-step" type="primary" onClick={this.props.nextStep}>Weiter</Button>
                    </FormItem>
                </div>
                );
    }
}