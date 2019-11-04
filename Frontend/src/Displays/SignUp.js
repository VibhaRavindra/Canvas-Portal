import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            isSignedUp: false,
            isInvalid: "",
            errMessage: ""
        }
        this.renderSignIn = this.renderSignIn.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
    }
    renderSignIn(){
        console.log("renderSignIn")
        this.setState({
            isSignedUp: true
        })
    }
    async submitSignUp(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data.values);
        const signUpUser = await fetch('/addUser',{
            body: data,
            method: 'PUT'
        })
        const responseSignUp = await signUpUser.json();
        this.setState({
            isInvalid: responseSignUp.isInvalid,
            errMessage: responseSignUp.errMessage
        })
        console.log(responseSignUp);
    }
    async componentDidMount(){
        const signInUser = await fetch('/isLoggedIn',{
            method: 'GET'
        })
        const responseSignIn = await signInUser.json();
        this.setState({
            isSignedUp: responseSignIn.isLoggedIn
        })
    }
    render(){
        let renderSignIn, failCase, renderDashboard;
        if(this.state.isSignedUp){
            renderSignIn = <Redirect to='/signin' />
        }else if(this.state.isInvalid === true){
            failCase = <div className="error-box">
            <span>
            <img className="error-icon" src="https://www.freeiconspng.com/uploads/alert-icon-red-11.png" alt="" />
            </span>
            <span className="error-msg">{this.state.errMessage}</span>
        </div>
        }else if (this.state.isInvalid === false){
            renderDashboard = <Redirect to='/signin' />
        }
        return(
            <div>
            {renderDashboard}
            <div className="LoginPage">
                <div className="imageHeader">
                    <img className="sjsuImage" src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" alt="" />
                    <div className="beacon-container"></div>
                </div>
                
                <div className="LogIncontainer">
                    <p className="signInText">Sign Up</p>
                    {failCase}
                    <form className="form"  onSubmit={this.submitSignUp}>
                    <input type="text" className="inputStyle1" name="username" placeholder="Name" required />  
                    <input type="email" className="inputStyle1" name="emailId" placeholder="SJSU Email ID" required />                
                    <input type="password" className="inputStyle1" name="password" placeholder="Password" required /> <br />
                    Student<input type="radio" value="student" name="employee" checked/>  
                    Faculty<input type="radio" value="faculty" name="employee" /> 
                    <button type="submit" className="signInBtn">Sign Up</button>
                    </form>
                    <button className="orText"  onClick={this.renderSignIn}>Already signed up?</button>
                    {renderSignIn}
                </div> 
            </div>
            </div>
        )
    }
}

export default SignUp;