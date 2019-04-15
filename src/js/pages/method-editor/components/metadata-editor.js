import React, { Component } from 'react';
import { Row, Col, Form, Select } from 'antd';
import { urlHelper } from '../../../helpers';
import { urlConstants } from '../../../constants';
import { sortByName, mapKeyToAttribute, addAttribute, delAttribute } from '../../../helpers';
import { translations } from '../../../translations';

const FormItem = Form.Item;
const Option = Select.Option;

const buildOptions = (data) => {
    return data.map((item) => {
        return (
            <Option key={item.id} value={item.id}>{item.name}</Option>
        );
    });
};

/**
 * form fields to describe the method with some meta data
 * @module components/partials/MethodAttributeFields
 * @extends Component
 */
export class MetadataEditor extends Component {
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {ReactNode} seminarTypes selectable seminar types
         * @property {ReactNode} seminarGoals selectable seminar goals
         * @property {ReactNode} methodTypes selectable method types
         * @property {ReactNode} methodLevels selectable method levels
         * @property {string} selectedSeminar id of selected seminar
         * @property {object} selectedLevels id of selected method levels
         * @property {object} selectedTypes id of selected method types
         * @property {object} selectedGoals id of selected method goals
         * @property {bool} seminarGoalsDisabled state of seminar goals select field (*default is true*)
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
     */
    handleSeminarTypeSelect(value) {
        let type = this.state.seminarTypes.filter(item => item.id === value)[0];
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
                    return {
                        id: type.id,
                        name: type.name,
                        goals: type.goals
                    };
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
            selectedSeminar: this.props.method.seminarType,
            selectedLevels: this.props.method.methodLevels,
            selectedTypes: this.props.method.methodTypes,
            selectedGoals: this.props.method.seminarGoals
        });

        // if there's a seminar type passed via props, we can show its  goals.
        if (this.props.method.seminarType) {
            this.setState({
                seminarGoals: this.props.method.seminarType.goals,
                seminarGoalsDisabled: false
            });
        }
    }

    componentWillUnmount() {
        this.props.method.seminarType = this.state.selectedSeminar;
        this.props.method.seminarGoals = this.state.selectedGoals;
        this.props.method.methodLevels = this.state.selectedLevels;
        this.props.method.methodTypes = this.state.selectedTypes;
        this.props.handleForm(this.props.method);
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        // const {getFieldDecorator} = this.props.form;

        // builds the already selected
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