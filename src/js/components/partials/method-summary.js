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
    }
    
    render() {

        const RawHTML = ({children, className = ''}) => 
            <div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />;

        const { seminarGoals } = this.props.status;
        const { content } = this.props.status;

        const translations = {
            goals: 'Ziele',
        };
        
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h3>{this.state.method.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col span={9} offset={3}>
                        <h3>{translations.goals}</h3>
                        <ul>
                            {seminarGoals.map(item=> (<li key={item.id}>{item.name}</li>))}
                        </ul>
                    </Col>
                    <Col span={9}>

                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <RawHTML>{content}</RawHTML>
                    </Col>
                </Row> 
            </div>
        );
    }
}