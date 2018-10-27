import React, { Component } from 'react';
import { Row, Col } from 'antd';


export class MethodSummary extends Component {    
    constructor(props) {    
        super(props);
    
        this.state = {    
            method: {}   
        };    
    }

    componentDidMount() {
        this.setState({
            method: this.props.status
        });
        console.log(this.props.status);
    }
    
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h2>Zusammenfassung</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <h3>{this.state.method.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <ul>
                            {
                                console.log(this.state.method.seminarGoals)
                                // this.state.method.seminarGoals.map(item => 
                                //     <li key={item.id}>{item.name}</li>
                                // )
                            }
                        </ul>
                    </Col>
                </Row>
            </div>
        );
    }
}