import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, Steps, Input } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;

export class MethodAttributeFields extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            seminarTypes: '',
            seminarGoals: {},
            methodTypes: '',
            methodLevels: '',
            selectedSeminar: '',
            seminarGoalsDisabled: true,
            seminarGoalsPlaceholder: 'Bitte erst ein Seminar auswählen!'
        };
        
        this.onSelectSeminarType = this.onSelectSeminarType.bind(this);
        this.onDeselectSeminarType = this.onDeselectSeminarType.bind(this);
        
        this.reqHeader = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }
    
    componentDidMount() {
        fetch('http://localhost:1234/api/seminars/types',{
            headers: this.reqHeader
        }).then(results => {
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
                
                let seminarGoals = data.map((type) => {
                    return type.seminar_goals.map((goal) => {
                        return (
                                <Option key={goal.id} value={goal.id}>{goal.name}</Option>
                                );
                    });
                });
                
                this.setState({
                    seminarTypes: seminarTypes,
                    seminarGoals: seminarGoals
                });
            });
        
        fetch('http://localhost:1234/api/methods/types',{
            headers: this.reqHeader
        }).then(results => {
                return results.json();
            }).then(data => {
                let methodTypes = data.map((type) => {
                    return (
                            <Option key={type.id} value={type.id}>{type.name}</Option>
                            );
                });
                this.setState({methodTypes: methodTypes});
            });
        
        fetch('http://localhost:1234/api/methods/levels',{
            headers: this.reqHeader
        }).then(results => {
                return results.json();
            }).then(data => {
                let methodLevels = data.map((level) => {
                    return (
                            <Option key={level.id} value={level.id}>{level.name}</Option>
                            );
                });
                this.setState({methodLevels: methodLevels});
            });
    }
    
    onSelectSeminarType(value, option) {
        this.setState({selectedSeminar: option.key,
                    seminarGoalsDisabled: false,
                    seminarGoalsPlaceholder: 'Bitte erst ein Seminar auswählen!'});
    }
    
    onDeselectSeminarType(value, option) {
        this.setState({selectedSeminar: '',
                    seminarGoalsDisabled: true,
                    seminarGoalsPlaceholder: 'Seminarziel(e) auswählen...!'});
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        
        return (
                <div className={this.props.className}>
                    <Row>
                        <Col span={24}>
                        <FormItem label="Methodenname">
                            {getFieldDecorator('title')(
                                <Input placeholder="Methodenname" />
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                        <FormItem label="Seminar">
                            {getFieldDecorator('seminarType')(
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
                        <Col span={8}>
                        <FormItem label="Typ">
                            {getFieldDecorator('methodType')(
                                <Select
                                    placeholder="Methodentyp auswählen..."
                                    notFoundContent="Es existieren keine Methodenypen" >
                                    {this.state.methodTypes}
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={8}>
                        <FormItem label="Level">
                            {getFieldDecorator('methodLevel')(
                                <Select
                                    placeholder="Level auswählen..."
                                    notFoundContent="Es existieren keine Level">
                                    {this.state.methodLevels}
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <FormItem label="Seminarziele">
                            {getFieldDecorator('seminarGoal')(
                                <Select
                                    mode="multiple"
                                    disabled={this.state.seminarGoalsDisabled}
                                    placeholder={this.state.seminarGoalsPlaceholder}
                                    notFoundContent="Es existieren keine Seminarziele">
                                    {this.state.seminarGoals[this.state.selectedSeminar]}
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