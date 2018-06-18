import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'antd';
//import { cartActions } from '../../actions/cartActions';
import store from '../../store';

/**
 * @type {Array.<{title:string, dataIndex:string, id:string, render: (text: any, record: T, index: number) => ReactNode>}
 */
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={'/method/show/'+record.id}>{text}</Link>
//    render: text => <a href="#">{text}</a>
}, {
    title: 'Seminar',
    dataIndex: 'seminar',
    key: 'seminar'
}, {
    title: 'Typ',
    dataIndex: 'typ',
    key: 'typ'
}, {
    title: 'Level',
    dataIndex: 'level',
    key: 'level'
}];


/**
 * container to display an overview of all available methods
 * @extends Component
 */
export class CartContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            methods: [],
            tableLoading: true
        };
    }
    /**
     * initialy disables submit button
     */
    componentDidMount() {
        const state = store.getState();
        console.log('cartCount:State',state);
        if (state.cart) {
            var cart = state.cart;
            if(cart) {
                this.setState({
                    methods: cart,
                    tableLoading: false
                });
            }
        }
    // this.props.dispatch(cartActions.getCart());
    }

    /**
     * render method
     * @return {ReactElement} markup
     * @private
     */
    render() {
        /**
       * @type {ReactElement}
       */
      
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h1>Methoden Korp</h1>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.methods} loading={this.state.tableLoading} rowKey="id"/>
            </div>
        );
    }
}

CartContainer.displayName = 'Method Cart Container';