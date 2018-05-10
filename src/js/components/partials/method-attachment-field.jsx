import React, { Component } from 'react';
import { Form, Row, Col, Upload, Icon, Button, message } from 'antd';

const Dragger = Upload.Dragger;
const FormItem = Form.Item;

// TODO: remove dummy properties for real settings
const draggerProps = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};

/**
 * form field to add attachments to the method like graphics or texts
 * @extends Component
 */
export class MethodAttachmentField extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={this.props.className}>
                <Row>
                    <Col span={24}>
                        <FormItem>
                            {getFieldDecorator('attachments')(
                                <Dragger {...draggerProps}>
                                    <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                                    <p className="ant-upload-text">Klick oder zieh eine Datei in diesen Bereich zum Hochladen</p>
                                    <p className="ant-upload-hint">Es können ein oder mehrere Dateien hochgeladen werden.</p>
                                </Dragger>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Button className="next-step" type="primary" htmlType="submit">Speichern</Button>
                    <Button onClick={this.props.prevStep}>Zurück</Button>
                </FormItem>
            </div>
        );
    }
}