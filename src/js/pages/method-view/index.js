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
                switch (response.status) {
                case 200:
                    return response.json();
                case 404:
                    console.error('response', response);
                    throw('404 error');
                case 500:
                    console.error('response', response);
                    throw ('500 error');
                }
            }).catch(() => {
                openNotification('error', translations.method_not_found, (<span>Die Methode konnte leider nicht gefunden werden. War der Link korrekt?<br/><br/><a href="/">Zurück</a></span>));
                this.setState({
                    tableLoading: true,
                });
            }).then(data => {
                let method = {
                    key: data.id,    
                    name: data.title,
                    content: {blocks: JSON.parse(data.content)},
                    seminar: data.seminar_type.name,
                    typ: data.method_types[0].name,
                    level: data.method_levels[0].name,
                    attachments: data.attachments.map((attachment) => ({
                        content: {blocks: JSON.parse(attachment.content)},
                        title: attachment.title,
                        id: attachment.id,
                    }))
                };

                this.setState({
                    method: method,
                    tableLoading: false
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
//
// const connectedMethodDetailPage = connect(mapStateToProps)(Index);
// export { connectedMethodDetailPage as Index };
//
// /**
//  * container for the method form
//  * @type Form
//  */
// export const Index = Form.create()(MethodDetail);