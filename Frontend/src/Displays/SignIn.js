import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderSignUp: false,
            isLoggedIn: false,
            IsInvalid: false,
            errMessage: ""
        }
        this.renderSignUp = this.renderSignUp.bind(this);
        this.submitSignIn = this.submitSignIn.bind(this);
    }
    renderSignUp(){
        this.setState ({
            renderSignUp: true
        })
    }
    async submitSignIn(e){
        e.preventDefault();
        const data = new FormData(e.target);
        const signInUser = await fetch('/getUser',{
            body: data,
            method: 'POST'
        })
        const responseSignIn = await signInUser.json();
        this.setState({
            IsInvalid: responseSignIn.IsInvalid,
            isLoggedIn: responseSignIn.isLoggedIn,
            errMessage: responseSignIn.errMessage
        })
    }
    async componentDidMount(){
        const signInUser = await fetch('/isLoggedIn',{
            method: 'GET'
        })
        const responseSignIn = await signInUser.json();
        this.setState({
            IsInvalid: responseSignIn.IsInvalid,
            isLoggedIn: responseSignIn.isLoggedIn,
            errMessage: responseSignIn.errMessage
        })
    }
    render(){
        let redirectRender, redirectDashboard, failCase;
        if(this.state.renderSignUp){
            redirectRender = <Redirect to='/signup' />
        }else if(this.state.isLoggedIn === true && this.state.IsInvalid === false){
            redirectDashboard = <Redirect to = '/dashboard' />
        }else if (this.state.IsInvalid === true){
            failCase = <div className="error-box">
            <span>
            <img className="error-icon" src="https://www.freeiconspng.com/uploads/alert-icon-red-11.png" alt="" />
            </span>
            <span className="error-msg">{this.state.errMessage}</span>
        </div>
        }
        
        return(
            <div>
                {redirectDashboard}
            <div className="LoginPage">
                <div className="imageHeader">
                    <img className="sjsuImage" src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" alt="" />
                    <div className="beacon-container"></div>
                </div>
                
                <div className="LogIncontainer">
                    <p className="signInText">Sign In</p>
                    {failCase}
                    <form className="form" onSubmit={this.submitSignIn}>
                    <input type="email" className="inputStyle1" name="emailId" placeholder="SJSU Email ID" required />                
                    <input type="password" className="inputStyle1" name="password" placeholder="Password" required /> 
                    <button type="submit" className="signInBtn">Sign In</button>
                    <button className="orText" onClick={this.renderSignUp}>Create an account? </button>
                    {redirectRender}
                    </form>
                </div> 
            </div>
            </div>
        )
    }
}

export default SignIn;