import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Button } from 'antd';
import { cartActions } from '../../actions/cartActions';
import store from '../../store';
import { connect } from 'react-redux';

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
export class CartContainerComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            methods: [],
            tableLoading: true
        };
        this.onDeletItem = this.onDeletItem.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }
    /**
     * Delete the selected Lines form cart
     */
    onDeletItem () {
        console.log('onDeletItem',this);
        console.log('selectedRowKeys',this.state.selectedRowKeys);
        this.state.selectedRowKeys.forEach(methodId => {
            let index = this.state.methods.findIndex(method => method.id == methodId);
            if(index >= 0) {
                const delMethod = this.state.methods[index];
                const newMethods = this.state.methods.filter((method) => method.id !== delMethod.id);
                this.setState({
                    selectedRowKeys: [],
                    methods: newMethods,
                    tableLoading: false
                });
                this.props.dispatch(cartActions.deleteMethode(delMethod));
            }
        });
        

    };
    /**
     * handle change of selected Row's
     * @param {[]} selectedRowKeys 
     */
    onSelectChange (selectedRowKeys) {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    /**
     * initialy disables submit button
     */
    componentDidMount() {
        const state = store.getState();
        //console.log('cartCount:State',state);
        if (state.cart) {
            var cart = state.cart;
            if(cart) {
                this.setState({
                    selectedRowKeys: [],
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
        const { tableLoading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        /**
       * @type {ReactElement}
       */
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <h1>Methoden Korb</h1>
                    </Col>
                </Row>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.onDeletItem}
                        disabled={!hasSelected}
                        loading={tableLoading}
                        shape="circle"
                        icon="delete"
                    >
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Ausgewählte ${selectedRowKeys.length} Methoden` : ''}
                    </span>
                </div>
                <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.methods} loading={this.state.tableLoading} rowKey="id"/>
            </div>
        );
    }
}

CartContainerComponent.displayName = 'Method Cart Container';
function mapStateToProps(state) {
    //console.log('state.cart', state.cart);
    const { cart } = state;
    const methods = cart;
    return {
        methods
    };
}

const connectedCartPage = connect(mapStateToProps)(CartContainerComponent);
export { connectedCartPage as CartContainer }; 
