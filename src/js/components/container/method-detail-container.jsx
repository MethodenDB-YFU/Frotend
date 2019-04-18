import React, { Component } from 'react';
import {Row, Col, Skeleton, Collapse} from 'antd';
import { urlHelper } from '../../helpers';
import { urlConstants } from '../../constants';
import { openNotification } from '../../shared/notification';
import { BlockContent } from '../../shared/method';
import { translations } from '../../translations';
import '../../../less/styles.less';
// import { cartActions } from '../../actions/cartActions';
// import { connect } from 'react-redux';

const Panel = Collapse.Panel;

/**
 * form to generate a new method
 * @extends Component
 * @todo maybe extend class to also edit a method
 */
export class MethodDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            tableLoading: true,
            method: {},
        };
    }

    /**
     * initialy disables submit button
     */
    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getMethod, this.state.id);
        fetch(fetchParams.url, fetchParams.request)
            .then(response => {
                console.log('response', response);
                return response.json();
            }).then(data => {
                let method = {
                    key: data.id,    
                    name: data.title,
                    content: {blocks: JSON.parse(data.content)},
                    seminar: data.seminar_type.name,
                    typ: data.method_types[0].name,
                    level: data.method_levels[0].name,
                    attachments: data.attachments.map((attachment) => (
                        {
                            content: {blocks: JSON.parse(attachment.content)},
                            title: attachment.title,
                            id: attachment.id,
                        })
                    )
                };
                console.log('fetched', method);
               
                // display loaded methods and remove loading-animation
                this.setState({
                    method: method,
                    tableLoading: false
                });
            }).catch(() => {
                openNotification('error', translations.connection_error, 'Could not connect to the server');
                this.setState({
                    tableLoading: false,
                });
            });
    };

    /**
     * render method
     * @return {ReactElement} markup
     */
    render() {
        /**
         * output RAW HTNL
         * @type {ReactElement}
         */
        // const RawHTML = ({children, className = ''}) =>
        //     <div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />;
        
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
         * output an attachment
         * @type {ReactElement}
         */
        function Attachment(props) {
            const { attachment } = props;
            return (
                <Panel key={attachment.id} header={attachment.title}>
                    <BlockContent content={attachment.content}/>
                </Panel>
            );
        }

        /**
         * output the attachment list
         * @type {ReactElement}
         */
        function AttachmentList(props) {
            const { loading, attachments } = props;
            const listItems = (!loading)
                ? attachments.map((attachment,i) =>
                    <Attachment key={i} attachment={attachment}/>)
                : null;
            return (
                <Collapse bordered={false} >
                    {listItems}
                </Collapse>
            );
        }

        // const onGoToEdit = () => {
        //     console.log('onGoToEdit',this);
        //     history.push('/method/edit/'+this.state.id);
        // };
        //
        // const onAddToCart = () => {
        //     let method = {
        //         id: this.state.method.key,
        //         name: this.state.method.name,
        //         seminar: this.state.method.seminar,
        //         typ: this.state.method.typ,
        //         level: this.state.method.level
        //     };
        //     this.props.dispatch(cartActions.addMethod(method));
        // };

        const loading = this.state.tableLoading;

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>{translations.method_details}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Method loading={loading} method={this.state.method}/>
                        <h2>{translations.attachments}</h2>
                        <AttachmentList loading={loading} attachments={this.state.method.attachments}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

MethodDetailContainer.displayName = 'Method Detail Container';
// function mapStateToProps(state) {
//     //console.log('state.cart', state.cart);
//     const { cart } = state;
//     return {
//         cart
//     };
// }

// const connectedMethodDetailPage = connect(mapStateToProps)(MethodDetailContainer);
// export { connectedMethodDetailPage as MethodDetailContainer };

/**
 * container for the method form
 * @type Form
 */
//export const MethodDetailContainer = Form.create()(MethodDetail);