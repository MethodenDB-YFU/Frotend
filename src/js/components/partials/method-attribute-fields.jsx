import React, { Component } from 'react';
import { Row, Col, Form, Select } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

const FormItem = Form.Item;
const Option = Select.Option;

/**
 * form fields to describe the method with some meta data
 * @module components/partials/MethodAttributeFields
 * @extends Component
 */
export class MethodAttributeFields extends Component {
    constructor(props) {
        super(props);
        
        /**
         * @type {object}
         * @property {ReactNode} seminarTypes selectable seminar types
         * @property {ReactNode} seminarGoals selectable seminar goals
         * @property {ReactNode} methodTypes selectable method types
         * @property {ReactNode} methodLevels selectable method levels
         * @property {string} selectedSeminar id of selected seminar
         * @property {bool} seminarGoalsDisabled state of seminar goals select field (*default is true*)
         * @property {string} seminarGoalsPlaceholder placeholder for seminar goals select
         */
        this.state = {
            seminarTypes: [],
            seminarGoals: [],
            methodTypes: '',
            methodLevels: '',
            selectedSeminar: '',
            seminarGoalsDisabled: true,
            seminarGoalsPlaceholder: 'Bitte erst ein Seminar auswählen!'
        };
        
        this.onSelectSeminarType = this.onSelectSeminarType.bind(this);
        this.onDeselectSeminarType = this.onDeselectSeminarType.bind(this);
        this.buildOption = this.buildOption.bind(this);
        this.extractGoals = this.extractGoals.bind(this);
    }
    

    buildOption(data) {
        let options = data.map((item) => {
            return (
                <Option key={item.id} value={item.id}>{item.name}</Option>
            );              
        });
        return options;
    }

    extractGoals(seminarType) {
        let goals = seminarType.map(type => type.goals);
        return goals;
    }

    /**
     * load the options for the select-fields
     */
    componentDidMount() {
        // fetching the seminar types including their goals
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getTypes);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let types = data.map((type) => {
                    let methodJson = {
                        id: type.id,
                        name: type.name,
                        goals: type.goals
                    };
                    return methodJson;
                });
                
                this.setState({
                    seminarTypes: types
                });
            });
        
        // // fetching the method types
        // fetch('http://localhost:1234/api/methods/types')
        //     .then(results => {
        //         return results.json();
        //     }).then(data => {
        //         let methodTypes = data.map((type) => {
        //             return (
        //                 <Option key={type.id} value={type.id}>{type.name}</Option>
        //             );
        //         });
        //         this.setState({methodTypes: methodTypes});
        //     });
        
        // // fetching the method levels
        // fetch('http://localhost:1234/api/methods/levels')
        //     .then(results => {
        //         return results.json();
        //     }).then(data => {
        //         let methodLevels = data.map((level) => {
        //             return (
        //                 <Option key={level.id} value={level.id}>{level.name}</Option>
        //             );
        //         });
        //         this.setState({methodLevels: methodLevels});
        //     });
    }
    
    /**
     * When a seminar type is selected the related goals become available.
     * @see https://ant.design/components/select/#API
     * @param {string} value
     * @param {ReactElement} option
     */
    onSelectSeminarType(value, option) {
        let type = this.state.seminarTypes.filter(item => item.id == value);
        let goals = type.map(item => item.goals)[0];

        this.setState({
            seminarGoals: goals,
            selectedSeminar: option.key,
            seminarGoalsDisabled: false,
            seminarGoalsPlaceholder: 'Bitte erst ein Seminar auswählen!'
        });
    }
    
    /**
     * When a seminar type is deselected the goals-select becomes inactive.
     * @see https://ant.design/components/select/#API
     * @param {string} value
     * @param {ReactElement} option
     */
    onDeselectSeminarType(value, option) { //eslint-disable-line no-unused-vars
        this.setState({
            selectedSeminar: '',
            seminarGoalsDisabled: true,
            seminarGoalsPlaceholder: 'Seminarziel(e) auswählen...!'
        });
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        // const {getFieldDecorator} = this.props.form;
        
        return (
            <div className={this.props.className}>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem label="Seminar">
                            <Select
                                showSearch
                                placeholder="Seminar auswählen..."
                                notFoundContent="Es existieren keine Seminare"
                                onSelect={this.onSelectSeminarType}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                onDeselect={this.onDeselectSeminarType} >
                                {this.buildOption(this.state.seminarTypes)}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Typ">
                            <Select
                                placeholder="Methodentyp auswählen..."
                                notFoundContent="Es existieren keine Methodenypen" >
                                {this.state.methodTypes}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Level">
                            <Select
                                placeholder="Level auswählen..."
                                notFoundContent="Es existieren keine Level">
                                {this.state.methodLevels}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label="Seminarziele">
                            <Select
                                showSearch
                                mode="multiple"
                                disabled={this.state.seminarGoalsDisabled}
                                placeholder={this.state.seminarGoalsPlaceholder}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                notFoundContent="Es existieren keine Seminarziele">
                                {this.buildOption(this.state.seminarGoals)}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}