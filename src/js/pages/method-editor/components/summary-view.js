import React, { Component } from 'react';
import { Method } from '../../../shared/method';


export class SummaryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            method: this.props.method,
        };
    }

    render() {
        return (
            <Method loading={false} method={this.state.method}/>
        );
    }
}