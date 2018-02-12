import React, {Component} from 'react';
import {connect} from "react-redux";
import {doLogout, fetchHeader} from "../actions";
import {bindActionCreators} from "redux";
import Config from "../config";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutMessage : ''
        };
    }

    componentWillMount(){
        this.props.doLogout();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            let temp = nextProps.data;

            if(temp.User.LogoutUser.status === 200)
            {
                localStorage.setItem(Config.ACCESS_TOKEN_KEY, '');
                this.setState({logoutMessage : "Hope you enjoy Reading, Please visit again !!!"});
            }
            else{
                this.setState({logoutMessage : "There is some problem with logging out !!"});
            }
        }
    }

    render() {
        return (
            <div className="container">
                <h3>{this.state.logoutMessage}</h3>
            </div>
        );
    }
}

function  mapStateToProps(state){
    return {
        data : state
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        doLogout,
        fetchHeader
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);