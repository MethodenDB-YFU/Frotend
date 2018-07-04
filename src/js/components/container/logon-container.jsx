import React, { Component } from 'react';
import { Form,  Icon, Input, Button, Row, Col, Card } from 'antd';
import Yfu_logo from '../../../images/logo/yfu_logo';
import { connect } from 'react-redux';

import { userActions } from '../../actions/userActions';
//import userManager from '../../helper/userManager';
import { userService } from '../../middleware';

const FormItem = Form.Item;
const { Meta } = Card;
/**
 * form to generate a new method
 * @extends Component
 * @todo maybe extend class to also edit a method
 */
export class LogonContainer  extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        //userActions.signIn();
        // reset login status
        //this.props.dispatch(userActions.logout());
        /**
         * @type {object}
         * @property {number} currentStep set step in formular
         */
        this.state = {
            tableLoading: false,
            showForm: false,
            username: '',
            password: '',
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /**
     * submit button
     */
    handleSubmit(e) {
        e.preventDefault();
        //const { dispatch } = this.props;
        //dispatch(userActions.signIn());
        userActions.signIn();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //const { username, password } = values;
                //const { dispatch } = this.props;
                //if (username && password) {
                //dispatch(userActions.login(username, password));
                //}
            }
        });
    }
    /**
     * initialy disables submit button
     */
    componentDidMount() {
        this.state.tableLoading = false;
    }

    emitEmpty() {
        this.userNameInput.focus();
        this.setState({ username: '' });
    }
    /**
     * render method
     * @return {ReactElement} markup
     */
    render() {
        /**
         * @type {ReactElement}
         */
        const { getFieldDecorator } = this.props.form;
        const logonTitle = (<div><h2>YFU-Methodendatenbank</h2> Hier kannst du dich anmelden.</div>);
        const showForm = this.props.showForm;
        /**
        const logonBtn = (<Link to="/method/new">Anmelden</Link>);
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
         */
        return (
            
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit} className="login-form">
                    <Row>
                        <Col span={12} offset={6}>
                            <Card bordered={false} loading={this.state.tableLoading}  cover={<Yfu_logo/>}>
                                <Meta title={logonTitle} />
                                { showForm && <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                    )}
                                </FormItem>}
                                { showForm && <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    )}
                                </FormItem>}
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                  Anmelden
                                    </Button>
                                </FormItem>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.user;
    let user = userService.mapOidc2User(state.oidc,state.user);
    return {
        loggingIn,
        user: user,
        toLogin: false
    };
}
//const WrappedLogonContainer = Form.create()(LogonContainer);
// ReactDOM.render(<WrappedLogonContainer />, mountNode);
const LogonForm = Form.create()(LogonContainer);
const connectedLoginPage = connect(mapStateToProps)(LogonForm);
export { connectedLoginPage as LogonFormContainer }; 
//export const LogonFormContainer = Form.create()(LogonContainer);
//export const LogonFormContainer = Form.create()(LogonContainer);
// LogonContainer.displayName = 'Anmelde Container';