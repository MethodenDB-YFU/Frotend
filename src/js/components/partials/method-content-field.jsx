import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { translations } from '../../translations';

const FormItem = Form.Item;

/**
 * form field to add the important content of the method
 * @extends Component
 */
export class MethodContentField extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            content: ''
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleEditorChange(e) {
        this.setState({
            content: e.target.getContent()
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    componentWillUnmount() {
        this.props.status.title = this.state.title;
        this.props.status.content = this.state.content;
        this.props.handleForm(this.props.status);
    }

    componentDidMount() {
        this.setState({
            title: this.props.status.title,
            content: this.props.status.content
        });
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        const { title, content } = this.state;

        return (
            <div className={this.props.className}>
                <Row>
                    <Col span={24}>
                        <FormItem label={translations.method_name}>
                            <Input
                                placeholder={translations.method_name}
                                value={title} size="large"
                                onChange={this.handleTitleChange}/>
                        </FormItem>
                        <FormItem>
                            <Editor
                                initialValue={content}

                                onChange={this.handleEditorChange}
                            />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}