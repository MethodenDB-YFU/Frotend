import React, { Component } from 'react';
import { urlHelper } from '../../helpers';
import { urlConstants } from '../../constants';
import { openNotification } from '../../shared/notification';
import { translations } from '../../translations';
import { Method } from '../../shared/method';
import '../../../less/styles.less';


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

    render() {
        return (
            <Method loading={this.state.tableLoading} method={this.state.method} />
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

// const connectedMethodDetailPage = connect(mapStateToProps)(Index);
// export { connectedMethodDetailPage as Index };

/**
 * container for the method form
 * @type Form
 */
//export const Index = Form.create()(MethodDetail);