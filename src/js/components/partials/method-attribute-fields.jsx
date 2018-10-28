import React, { Component } from 'react';
import { Row, Col, Form, Select } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

const FormItem = Form.Item;
const Option = Select.Option;

const addAttribute = (list, attribute) => [...list, attribute];
const delAttribute = (list, attribute) => {
    const removedIndex = list.findIndex(item => item.id == attribute.id);
    let attributes = [
        ...list.slice(0, removedIndex),
        ...list.slice(removedIndex+1)
    ];
    return attributes;
};

const mapKeyToAttribute = (list, key) => {
    return list.find(item => item.id == key);
};

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
            methodTypes: [],
            methodLevels: [],
            selectedSeminar: {},
            selectedLevels: [],
            selectedTypes: [],
            selectedGoals: [],
            seminarGoalsDisabled: true,
            seminarGoalsPlaceholder: 'Bitte erst ein Seminar auswählen!'
        };
        
        this.onSelectSeminarType = this.onSelectSeminarType.bind(this);
        this.onDeselectSeminarType = this.onDeselectSeminarType.bind(this);
        this.buildOptions = this.buildOptions.bind(this);
        this.extractGoals = this.extractGoals.bind(this);
        this.handleLevelSelect = this.handleLevelSelect.bind(this);
        this.handleLevelDeselect = this.handleLevelDeselect.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
        this.handleTypeDeselect = this.handleTypeDeselect.bind(this);
        this.handleGoalSelect = this.handleGoalSelect.bind(this);
        this.handleGoalDeselect = this.handleGoalDeselect.bind(this);
    }
    

    buildOptions(data) {
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

    componentWillUnmount() {
        console.log(this.state.selectedGoals);
        let attributes = {
            seminarType: this.state.selectedSeminar,
            seminarGoals: this.state.selectedGoals,
            methodLevels: this.state.selectedLevels,
            methodTypes: this.state.selectedTypes
        };
        this.props.handleForm(attributes);
    }

    handleLevelSelect(key) {
        const level = mapKeyToAttribute(this.state.methodLevels, key);
        const levels = addAttribute(this.state.selectedLevels, level);
        this.setState({
            selectedLevels: levels
        });
    }

    handleLevelDeselect(key) {
        const level = mapKeyToAttribute(this.state.methodLevels, key);
        const levels = delAttribute(this.state.selectedLevels, level);
        this.setState({
            selectedLevels: levels
        });
    }

    handleTypeSelect(key) {
        const type = mapKeyToAttribute(this.state.methodTypes, key);
        const types = addAttribute(this.state.selectedTypes, type);
        this.setState({
            selectedTypes: types
        });
    }

    handleTypeDeselect(key) {
        const type = mapKeyToAttribute(this.state.methodTypes, key);
        const types = delAttribute(this.state.selectedTypes, type);
        this.setState({
            selectedLevels: types
        });
    }

    handleGoalSelect(key) {
        const goal = mapKeyToAttribute(this.state.seminarGoals, key);
        const goals = addAttribute(this.state.selectedGoals, goal);
        this.setState({
            selectedGoals: goals
        });
    }

    handleGoalDeselect(key) {
        const goal = mapKeyToAttribute(this.state.seminarGoals, key);
        const goals = delAttribute(this.state.selectedGoals, goal);
        this.setState({
            selectedGoals: goals
        });
    }
    /**
     * load the options for the select-fields
     */
    componentDidMount() {
        // fetching the seminar types including their goals
        let fetchParams = urlHelper.buildFetchParams(urlConstants.getTypes);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let seminarTypes = data.map((type) => {
                    let methodJson = {
                        id: type.id,
                        name: type.name,
                        goals: type.goals
                    };
                    return methodJson;
                });
                
                this.setState({
                    seminarTypes: seminarTypes
                });
            });
            

        // fetching the method types
        fetchParams = urlHelper.buildFetchParams(urlConstants.getAllMethodTypes);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let methodTypes = data.map((type) => {
                    return {
                        id: type.id,
                        name: type.name
                    };
                });

                this.setState({
                    methodTypes: methodTypes
                });
            });
            
        
        // fetching the method levels
        fetchParams = urlHelper.buildFetchParams(urlConstants.getAllMethodLevels);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let methodLevels = data.map((level) => {
                    return  {
                        id: level.id,
                        name: level.name
                    };
                });
                this.setState({
                    methodLevels: methodLevels
                });
            });

        this.setState({
            selectedSeminar: this.props.status.seminarType,
            selectedLevels: this.props.status.methodLevels,
            selectedTypes: this.props.status.methodTypes,
            selectedGoals: this.props.status.seminarGoals
        });

        if (this.props.status.seminarType) {
            this.setState({
                seminarGoals: this.props.status.seminarType.goals,
                seminarGoalsDisabled: false
            });
        }
    }
    
    /**
     * When a seminar type is selected the related goals become available.
     * @see https://ant.design/components/select/#API
     * @param {string} value
     * @param {ReactElement} option
     */
    onSelectSeminarType(value) {
        let type = this.state.seminarTypes.filter(item => item.id == value)[0];
        let goals = type.goals;

        this.setState({
            seminarGoals: goals,
            selectedSeminar: type,
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
            selectedSeminar: {},
            seminarGoals: [],
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

        const selectedSeminar = (this.state.selectedSeminar) ? this.state.selectedSeminar.id : undefined;
        const selectedTypes = (this.state.selectedTypes) ? this.state.selectedTypes.map(item => item.id) : undefined;
        const selectedLevels = (this.state.selectedLevels) ? this.state.selectedLevels.map(item => item.id) : undefined;
        const selectedGoals = (this.state.selectedGoals) ? this.state.selectedGoals.map(item => item.id) : undefined;

        return (
            <div className={this.props.className}>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem label="Seminar">
                            <Select
                                showSearch
                                placeholder="Seminar auswählen..."
                                value={selectedSeminar}
                                notFoundContent="Es existieren keine Seminare"
                                onSelect={this.onSelectSeminarType}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                onDeselect={this.onDeselectSeminarType} >
                                {this.buildOptions(this.state.seminarTypes)}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Typ">
                            <Select
                                mode="multiple"
                                value={selectedTypes}
                                placeholder="Methodentyp auswählen..."
                                notFoundContent="Es existieren keine Methodenypen" 
                                onSelect={this.handleTypeSelect}
                                onDeselect={this.handleTypeDeselect}>
                                {this.buildOptions(this.state.methodTypes)}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Level">
                            <Select
                                mode="multiple"
                                value={selectedLevels}
                                placeholder="Level auswählen..."
                                notFoundContent="Es existieren keine Level"
                                onSelect={this.handleLevelSelect}
                                onDeselect={this.handleLevelDeselect}>
                                {this.buildOptions(this.state.methodLevels)}
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
                                value={selectedGoals}
                                disabled={this.state.seminarGoalsDisabled}
                                placeholder={this.state.seminarGoalsPlaceholder}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                onSelect={this.handleGoalSelect}
                                onDeselect={this.handleGoalDeselect}
                                notFoundContent="Es existieren keine Ziele für dieses Seminar">
                                {this.buildOptions(this.state.seminarGoals)}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}