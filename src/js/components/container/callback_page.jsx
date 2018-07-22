import React from 'react';
import { connect } from 'react-redux';
//import { CallbackComponent } from 'redux-oidc';
//import { userActions } from '../../actions/userActions';
import ReactLoading from 'react-loading';

//import userManager from '../../helpers/userManager';
import { history } from '../../helpers';

class CallbackPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('CallbackPage props',props);
        this.state = {
            tableLoading: false,
            user: {},
            oidc: {}
        };
        this.successLogin = this.successLogin.bind(this);
    }

    successLogin(){
        //let dispatch = this.props.dispatch;
        history.push('/');
        /*
        userManager.getUser().then(function (oidUser) {
            if (oidUser) {
                console.log('successLogin:oidUser', oidUser);
                history.push('/');
                /*
                let user = {
                    id: oidUser.id_token,
                    username: '',
                    password: '',
                    access_token: oidUser.access_token,
                    fullName: oidUser.profile.name,
                    picture: oidUser.profile.picture,
                    loggedIn: !oidUser.expired
                };
                console.log('successLogin', user);
                //dispatch(userActions.setLoggedIn(user)).then(history.push('/'));
                //userActions.setLoggedIn(user);
            } else {
                console.error('no User get');
            }
        });
                */
    }

    componentDidMount() {
        this.state.tableLoading = false;
        console.log('componentDidMount', this.state);
    }

    render() {
        // just redirect to '/' in both cases
        return (
            <div>
                <center><h1>Redirecting...</h1></center>
                <center><ReactLoading type="spinningBubbles" color="#642869"  /></center>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { user } = state;
    const { oidc } = state;
    console.log('Callback map oidc',oidc);
    if ((!user.id)&&(oidc.user)) {
        user = {
            id: oidc.user.id_token,
            username: '',
            password: '',
            access_token: oidc.user.access_token,
            fullName: oidc.user.profile.name,
            picture: oidc.user.profile.picture,
            loggedIn: !oidc.user.expired
        };
    }
    console.log('Callback map User',user);
    return state;
    //return {
    //user,
    //oidc: state.oidc
    //};
}

const connectedCallback= connect(mapStateToProps)(CallbackPage);
export { connectedCallback as CallbackPage }; 

