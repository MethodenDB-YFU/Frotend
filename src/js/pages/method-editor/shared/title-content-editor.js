import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { Editor } from '../../../shared/editor';

const FormItem = Form.Item;

/**
 * form field to add the important content of the method
 * @extends Component
 */
export class TitleContentEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            title: this.props.title,
            content: this.props.content,
        };

        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    /**
     * @todo is maintaining an internal state necessary?
     * @param e
     */
    handleTitleChange(e) {
        this.setState({
            title: e.target.value,
        });
        this.props.handleUpdate({
            id: this.state.id,
            title: e.target.value,
            content: this.state.content,
        });
    }

    /**
     * @todo is maintaining an internal state necessary?
     * @param content
     */
    handleContentChange(content) {
        this.setState({
            content: content,
        });
        this.props.handleUpdate({
            id: this.state.id,
            title: this.state.title,
            content: content,
        });
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        return (
            <div className={this.props.className}>
                <Row>
                    <Col span={24}>
                        <FormItem>
                            <Input
                                placeholder={this.props.placeholderTitle}
                                value={this.state.title}
                                size="large"
                                onChange={this.handleTitleChange}/>
                        </FormItem>
                        <FormItem>
                            <Editor
                                key={this.state.id}
                                id={this.state.id}
                                data={this.state.content}
                                onChange={this.handleContentChange}
                            />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}