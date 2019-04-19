import React from 'react';
import { translations } from '../../translations';
import { BlockContent } from './utils/block-renderer';
import { Col, Collapse, Row, Skeleton } from 'antd';

const Panel = Collapse.Panel;

/**
 * render method
 * @return {ReactElement} markup
 */
export function Method(props) {
    const { loading, method } = props;
    const { attachments } = method;


    /**
     * output a method
     * @type {ReactElement}
     */
    function Method(props) {
        const {loading, method} = props;
        return (
            loading
                ? <Skeleton active />
                : (
                    <div>
                        <h1>{method.title}</h1>
                        <BlockContent key={method.id} content={method.content} />
                    </div>
                )
        );
    }

    /**
     * output the attachment list
     * @type {ReactElement}
     */
    function Attachments(props) {
        const { loading, attachments } = props;
        return (
            loading
                ? <Skeleton active />
                : (
                    <Collapse bordered={false}>
                        {
                            attachments.map((attachment) => {
                                return (
                                    <Panel key={attachment.id} header={attachment.title}>
                                        <BlockContent content={attachment.content}/>
                                    </Panel>
                                );
                            })
                        }
                    </Collapse>
                )
        );
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <h2>{translations.method_details}</h2>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Method
                        loading={loading}
                        method={method}
                    />
                    <hr/>
                    <h2>{translations.attachments}</h2>
                    <Attachments
                        loading={loading}
                        attachments={attachments}
                    />
                </Col>
            </Row>
        </div>
    );
}