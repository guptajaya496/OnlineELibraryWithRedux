import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {doLogin} from "../actions/index";
import Config from "../config";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state={
            counter:0,
            username : null,
            password:null,
            userNameValid:false,
            passwordValid:false,
            validForm:false
        };

        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
        this.onChangeUserNameHandler = this.onChangeUserNameHandler.bind(this);
        this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    handleLoginFormSubmit(event){
        event.preventDefault();
    }

    componentWillReceiveProps(nextProps){

        const { history } = this.props;

        if(nextProps.User){

            let temp = nextProps.User;

            if(temp.success === true){
                localStorage.setItem(Config.ACCESS_TOKEN_KEY,temp.token.toString());
                history.push('/user');
            }
            else{
                alert("Please try Login again!!!");
            }
        }
    }

    loginHandler(){

        this.setState({counter: this.state.counter+1});

        if(this.state.userNameValid && this.state.passwordValid){
            this.setState({validForm: true});

            this.props.doLogin(this.state.username, this.state.password,history);
        }
        else{
            alert("Please fill all the Fields!!");
            this.setState({validForm: false});
        }
    }

    onChangeUserNameHandler(e){

        this.setState({username:e.target.value});

        if(e.target.value != "" ) {
            this.setState({userNameValid : true});
        }
        else{
            this.setState({userNameValid: false});
        }
    }

    onChangePasswordHandler(e){
        this.setState({password:e.target.value});
        if(e.target.value != "" ) {
            this.setState({passwordValid : true});
        }
        else{
            this.setState({passwordValid: false});
        }
    }

    render(){
        return(
            <div className="container table-bordered ">
                    <div className="row-contentlogin">
                        <div className="heading">
                            <h1>Already A Member</h1>
                        </div>
                        <div className="col-sm-12">
                            <form onSubmit={this.handleLoginFormSubmit}>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon col-sm-1"><i className="glyphicon glyphicon-user"></i></span>
                                        <input type="text" className="form-control col-sm-11" id="email" placeholder="Email ID"
                                                onChange={this.onChangeUserNameHandler}></input>
                                    </div>
                                    {((!this.state.userNameValid && this.state.counter === 0)|| (this.state.userNameValid) || (this.state.userNameValid && this.state.counter > 0))?
                                        null : <div className="alert alert-warning">
                                                 <strong>Warning!</strong> Please enter User Name
                                               </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon col-sm-1"><i className="glyphicon glyphicon-lock"></i></span>
                                        <input type="password" className="form-control col-sm-11" id="pwd" placeholder="Password"
                                                onChange={this.onChangePasswordHandler}></input>
                                    </div>
                                    {((!this.state.passwordValid && this.state.counter === 0) || (this.state.passwordValid)|| (this.state.passwordValid && this.state.counter > 0))?
                                        null : <div className="alert alert-warning">
                                            <strong>Warning!</strong> Please enter Password
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary col-sm-offset-8  col-sm-3" onClick={this.loginHandler}>Login</button>
                                </div>
                                <div className="col-sm-6">
                                    <button type="button" className="btn btn-primary col-sm-offset-3 col-sm-3">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}

function  mapStateToProps(state){
    return {
        User : state.User
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        doLogin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

