import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { TitleContentEditor } from '../shared/title-content-editor';
import { translations } from '../../../translations';

/**
 * form field to add the important content of the method
 * @extends Component
 */
export class ContentEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.method.title,
            content: this.props.method.content
        };

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(data) {
        this.setState({
            title: data.title,
            content: data.content
        });
    }

    componentWillUnmount() {
        let method = this.props.method;
        method.title = this.state.title;
        method.content = this.state.content;
        this.props.handleForm(method);
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        //this logs once without and once with correct data. WHYyYY??
        console.log('render', this.state);

        return (
            <div className={this.props.className}>
                <Row>
                    <Col span={24}>
                        <TitleContentEditor
                            placeholderTitle={translations.method_title}
                            handleUpdate={this.handleUpdate}
                            // className={}
                            title={this.state.title}
                            content={this.state.content}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}