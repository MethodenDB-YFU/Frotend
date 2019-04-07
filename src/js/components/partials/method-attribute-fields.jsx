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

const sortByName = (list) => {
    return list.sort((a, b) => a.name < b.name ? -1 : 1);
};

const buildOptions = (data) => {
    let options = data.map((item) => {
        return (
            <Option key={item.id} value={item.id}>{item.name}</Option>
        );
    });
    return options;
};

const translations = {
    seminar: 'Seminar',
    type: 'Typ',
    level: 'Level',
    seminar_goals: 'Seminarziele',
    seminar_select_placeholder: 'Seminar auswählen...',
    no_seminars_found: 'Es existieren keine Seminare',
    method_type_select_placeholder: 'Methodentyp auswählen...',
    no_method_types_found: 'Es existieren keine Methodentypen',
    method_level_select_placeholder: 'Methoden-Level auswählen...',
    no_method_levels_found: 'Es existieren keine Methoden-Level',
    seminar_goals_select_placeholder: 'Seminarziele auswählen...',
    no_seminar_goals_found: 'Es existieren keine Seminarziele für das ausgwählte Seminar',
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
        };

        this.handleSeminarTypeSelect = this.handleSeminarTypeSelect.bind(this);
        this.handleSeminarTypeDeselect = this.handleSeminarTypeDeselect.bind(this);
        this.handleLevelSelect = this.handleLevelSelect.bind(this);
        this.handleLevelDeselect = this.handleLevelDeselect.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
        this.handleTypeDeselect = this.handleTypeDeselect.bind(this);
        this.handleGoalSelect = this.handleGoalSelect.bind(this);
        this.handleGoalDeselect = this.handleGoalDeselect.bind(this);
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
            selectedTypes: types
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
     * When a seminar type is selected the related goals become available.
     * @see https://ant.design/components/select/#API
     * @param {string} value
     * @param {ReactElement} option
     */
    handleSeminarTypeSelect(value) {
        let type = this.state.seminarTypes.filter(item => item.id == value)[0];
        let goals = type.goals;

        this.setState({
            seminarGoals: goals,
            selectedSeminar: type,
            seminarGoalsDisabled: false,
        });
    }

    /**
     * When a seminar type is deselected the goals-select becomes inactive.
     * @see https://ant.design/components/select/#API
     * @param {string} value
     * @param {ReactElement} option
     */
    handleSeminarTypeDeselect(value, option) { //eslint-disable-line no-unused-vars
        this.setState({
            selectedSeminar: {},
            seminarGoals: [],
            seminarGoalsDisabled: true,
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

    componentWillUnmount() {
        this.props.status.seminarType = this.state.selectedSeminar;
        this.props.status.seminarGoals = this.state.selectedGoals;
        this.props.status.methodLevels = this.state.selectedLevels;
        this.props.status.methodTypes = this.state.selectedTypes;
        this.props.handleForm(this.props.status);
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
                        <FormItem label={translations.seminar}>
                            <Select
                                showSearch
                                placeholder={translations.seminar_select_placeholder}
                                value={selectedSeminar}
                                notFoundContent={translations.no_seminars_found}
                                onSelect={this.handleSeminarTypeSelect}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                onDeselect={this.handleSeminarTypeDeselect} >
                                {buildOptions(sortByName(this.state.seminarTypes))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={translations.type}>
                            <Select
                                mode="multiple"
                                value={selectedTypes}
                                placeholder={translations.method_type_select_placeholder}
                                notFoundContent={translations.no_method_types_found}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                onSelect={this.handleTypeSelect}
                                onDeselect={this.handleTypeDeselect}>
                                {buildOptions(sortByName(this.state.methodTypes))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={translations.level}>
                            <Select
                                mode="multiple"
                                value={selectedLevels}
                                placeholder={translations.method_level_select_placeholder}
                                notFoundContent={translations.no_method_levels_found}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                onSelect={this.handleLevelSelect}
                                onDeselect={this.handleLevelDeselect}>
                                {buildOptions(sortByName(this.state.methodLevels))}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label={translations.seminar_goals}>
                            <Select
                                showSearch
                                mode="multiple"
                                value={selectedGoals}
                                disabled={this.state.seminarGoalsDisabled}
                                placeholder={translations.seminar_goals_select_placeholder}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                optionFilterProp="children"
                                onSelect={this.handleGoalSelect}
                                onDeselect={this.handleGoalDeselect}
                                notFoundContent={translations.no_seminar_goals_found}>
                                {buildOptions(sortByName(this.state.seminarGoals))}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}