import React, { Component } from 'react';
import { Row, Col, Card, Divider } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

/**
 * form to generate a new method
 * @extends Component
 * @todo maybe extend class to also edit a method
 */
export class MethodDetailContainer  extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        /**
         * @type {object}
         * @property {number} currentStep set step in formular
         */
        this.state = {
            currentStep: 0,
            id: props.match.params.id,
            tableLoading: true,
            methode: {}
        };
        
    }

    /**
     * initialy disables submit button
     */
    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getMethod, this.state.id);
        console.log('fetchParams',fetchParams);
        //fetch('http://localhost:1234/api/methods/'+this.state.id, {method: 'GET',headers:{ 'Content-Type': 'application/json', 'X-User-ID': 'aa40d8c0-e705-11e7-80c1-9a214cf093ae'}})
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let method = {
                    key: data.id,    
                    name: data.title,
                    content: data.content,
                    seminar: data.seminar_type.name,
                    typ: data.method_types[0].name,
                    level: data.method_levels[0].name,
                    attachments: data.attachments
                };
                console.log(method);
               
                // display loaded methods and remove loading-animation
                this.setState({
                    methode: method,
                    tableLoading: false
                });
            });
    }
    
    /**
     * render method
     * @return {ReactElement} markup
     */
    render() {
        /**
         * output RAW HTNL
         * @type {ReactElement}
         */
        const RawHTML = ({children, className = ''}) => 
            <div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />;
        
        /**
         * output a attachment
         * @type {ReactElement}
         */
        function AttachmentItem(props) { 
            return (
                <div> 
                    <RawHTML>{props.content}</RawHTML>
                    <Divider />
                </div>
            );
        }
        /**
         * output the attachment list
         * @type {ReactElement}
         */
        function AttachmentList(props) {
            const attachments = props.attachments;
            const listItems = attachments.map((attachment) =>
                <AttachmentItem key={attachment.id} content={attachment.content}></AttachmentItem>
            );
            return (
                <div> 
                    {listItems}
                </div>
            );
        }

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>Detail der Methode</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title={this.state.methode.name} bordered={false} loading={this.state.tableLoading} extra={<a href={'/method/edit/'+this.state.methode.key}>Bearbeiten</a>} >
                            <RawHTML>{this.state.methode.content}</RawHTML> 
                            <br/>
                            <div><h2>Attatchemt</h2>
                                <AttachmentList attachments={this.state.methode.attachments}></AttachmentList>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

MethodDetailContainer.displayName = 'Method Detail Container';
/**
 * container for the method form
 * @type Form
 */
//export const MethodDetailContainer = Form.create()(MethodDetail);