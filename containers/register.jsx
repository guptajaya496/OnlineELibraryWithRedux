import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {doRegister, fetchHeader} from "../actions/index";

class Register extends Component{

    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onChangeFirstNameHandler = this.onChangeFirstNameHandler.bind(this);
        this.onChangeLastNameHandler = this.onChangeLastNameHandler.bind(this);
        this.onChangeEmailIdHandler = this.onChangeEmailIdHandler.bind(this);
        this.onChangeUserNameHandler = this.onChangeUserNameHandler.bind(this);
        this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
        this.onChangeConfpasswordHandler = this.onChangeConfpasswordHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);

        this.state = {

            counter:0,

            firstName : null,
            firstNameValid:false,

            lastName:null,
            lastNameValid:false,

            emailId:null,
            emailIdValid:false,

            userName:null,
            userNameValid:false,

            password:null,
            passwordValid:false,

            confPassword:null,
            confPasswordValid:false,

            validForm:false
        };
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.data){

            const { history } = this.props;

            let temp = nextProps.data;

            if(temp.User.status === "Registration Successful!" ){
                history.push('/login');
            }
            else{
                alert("Registration is failed, Please try again!!")
            }
        }
    }

    handleFormSubmit(event){
        event.preventDefault();
    }

    signupHandler(){
        this.setState({counter: this.state.counter+1});

        if(this.state.firstNameValid && this.state.lastNameValid && this.state.emailIdValid &&
            this.state.userNameValid && this.state.passwordValid && this.state.confPasswordValid ){

            this.setState({validForm: true});

            this.props.doRegister(this.state.firstName,this.state.lastName,this.state.userName,
                this.state.password,this.state.emailId,this.state.confPassword, history);
        }
        else
        {
            alert("Please fill all the Fields!!");
            this.setState({validForm: false});
        }
    }

    onChangeFirstNameHandler(e){
        this.setState({firstName:e.target.value});
        if(e.target.value != "" ) {
            this.setState({firstNameValid: true});
        }
        else{
            this.setState({firstNameValid: false});
        }
    }

    onChangeLastNameHandler(e){
        this.setState({lastName:e.target.value});
        if(e.target.value != "" ) {
            this.setState({lastNameValid: true});
        }
        else{
            this.setState({lastNameValid: false});
        }
    }

    onChangeEmailIdHandler(e){
        this.setState({emailId:e.target.value});
        if(e.target.value != "" ) {
            this.setState({emailIdValid : true});
        }
        else{
            this.setState({emailIdValid: false});
        }
    }

    onChangeUserNameHandler(e){
        this.setState({userName:e.target.value});
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

    onChangeConfpasswordHandler(e){
        this.setState({confPassword:e.target.value});
        if(e.target.value != "" && e.target.value === this.state.password ) {

            this.setState({confPasswordValid : true});
        }
        else{
            this.setState({confPasswordValid: false});
        }
    }

    render(){
        return(
            <div className="container table-bordered">
                <div className="heading">
                    <h1>New Member</h1>
                </div>
                <div className="col-sm-12">
                    <form onSubmit={this.handleFormSubmit}>

                        <div className="form-group col-sm-6">
                            <label htmlFor="firstName">First Name:</label>

                            <input type="text" className="form-control"
                                   id="firstName" placeholder="Enter First Name"
                                   onChange={this.onChangeFirstNameHandler} autoComplete="on"></input>
                            {( (!this.state.firstNameValid && this.state.counter > 0))?
                                <div className="alert alert-warning">
                                    <strong>Warning!</strong> Please enter First Name
                                </div> : null
                            }
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" className="form-control"
                                   id="lastName" placeholder="Enter Last Name"
                                   onChange={this.onChangeLastNameHandler} autoComplete="on"></input>
                            {((this.state.lastNameValid && this.state.counter > 0))?
                                <div className="alert alert-warning">
                                    <strong>Warning!</strong> Please enter Last Name
                                </div> : null
                            }
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="emailId">E-mail ID:</label>
                            <input type="email" className="form-control"
                                   id="emailId" placeholder="Enter E mail Id"
                                   onChange={this.onChangeEmailIdHandler} autoComplete="on"></input>
                            {((this.state.emailIdValid && this.state.counter > 0))?
                                <div className="alert alert-warning">
                                    <strong>Warning!</strong> Please enter Email id
                                </div> : null
                            }
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="userName">User Name:</label>
                            <input type="text" className="form-control"
                                   id="userName" placeholder="Enter UserName"
                                   onChange={this.onChangeUserNameHandler} autoComplete="on"></input>
                            {((this.state.userNameValid && this.state.counter > 0))?
                                <div className="alert alert-warning">
                                    <strong>Warning!</strong> Please enter User Name
                                </div> : null
                            }
                        </div>

                       <div className="form-group col-sm-6">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control"
                                   id="password" placeholder="Enter password"
                                   onChange={this.onChangePasswordHandler} autoComplete="on"></input>
                            {((this.state.passwordValid && this.state.counter > 0))?
                                <div className="alert alert-warning">
                                    <strong>Warning!</strong> Please enter Password
                                </div> : null
                            }
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="confpassword">Confirm Password:</label>
                            <input type="password" className="form-control"
                                   id="confpassword" placeholder="Enter Confirm password"
                                   onChange={this.onChangeConfpasswordHandler} autoComplete="on"></input>
                            {((this.state.confPasswordValid && this.state.counter > 0))?
                                <div className="alert alert-warning">
                                    <strong>Warning!</strong> Please enter Confirm Password same as password
                                </div> : null
                            }
                        </div>

                        <div className="row col-sm-12">
                            <div className="col-sm-6">
                                <button type="submit" className="btn btn-primary btn btn-lg col-sm-2" onClick={this.signupHandler}>Register</button>
                            </div>

                            <div className="col-sm-6">
                                <button type="button" className="btn btn-primary btn btn-lg col-sm-2" >Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
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
        doRegister,
        fetchHeader
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

