import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { urlHelper } from '../../helpers';
import {urlConstants} from '../../constants';

/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class RoleDetailContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: props.match.params.id,
            seminarRole: {},
            dataLoading: true
        };
    }

    componentDidMount() {
        const fetchParams = urlHelper.buildFetchParams(urlConstants.getRole, this.state.id);
        fetch(fetchParams.url, fetchParams.request)
            .then(results => {
                return results.json();
            }).then(data => {
                let role = {
                    key: data.id,    
                    name: data.name,
                    role_type: data.role_type,
                    types_roles: data.types_roles,
                };
                //console.log(method);
              
                // display loaded methods and remove loading-animation
                this.setState({
                    seminarRole: role,
                    dataLoading: false
                });
            });
    }

    /**
     * render method
     * @return {ReactElement} markup
     */
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>Detail der Rolle {this.state.seminarRole.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div className="DetailLable">Rolentyp:</div>
                    </Col>
                    <Col span={20}>
                        <div>{this.state.seminarRole.role_type}</div>
                    </Col>
                </Row>
            </div>
        );
    }
}
RoleDetailContainer.displayName = 'Seminarziehle Overview Container';