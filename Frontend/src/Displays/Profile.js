import React, { Component } from 'react';
import Navigation from './Navigation'
import { Link,Redirect } from "react-router-dom";
import '../App.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            imageChanged:false,
            preview:null,
            name:null,
            email:null,
            phonenumber:null,
            aboutme:null,
            city:null,
            country:null,
            company:null,
            school:null,
            hometown:null,
            languages:null,
            gender:null,
            profileUpdated:false
        }
        this.resetState = this.resetState.bind(this)
    }
    
    
    async resetState(){
        let currentUserId = this.state.userid;
        if(this.props.match.params.profileid){
            currentUserId = this.props.match.params.profileid
        }
        // get the image from backend
        const imageRes = await fetch("/getProfileImage/"+currentUserId,{
            method:"GET"
        })
        const imageJson = await imageRes.json();
        if(imageJson.success) {
            this.setState({
                preview:imageJson.image
            })
        } 
        // get full profile data from backend
        const profileRes = await fetch("/getProfileData/"+currentUserId,{
            method:"GET"
        })
        const profileJson = await profileRes.json();
        if(profileJson.success) {
            this.setState({
            name:profileJson.name,
            email:profileJson.email,
            phonenumber:profileJson.phonenumber,
            aboutme:profileJson.aboutme,
            city:profileJson.city,
            country:profileJson.country,
            company:profileJson.company,
            school:profileJson.school,
            hometown:profileJson.hometown,
            languages:profileJson.languages,
            gender:profileJson.gender
            })
        } 

    }
    async componentDidMount(){
        const signInUser = await fetch('/isLoggedIn',{
            method: 'GET'
        })
        const responseSignIn = await signInUser.json();
        this.setState({
            isLoggedIn: responseSignIn.isLoggedIn,
            userid:responseSignIn.userid
        })
        this.resetState();
    }
    render(){
        let updateProfile = null;
        if(this.props.match.params.profileid && this.props.match.params.profileid === String(this.state.userid)) {
            updateProfile = <div className="update-profile-btn">
            <Link to="/updateprofile" className="link"><i class="fas fa-user-edit"></i> Update Profile</Link>
        </div>
        } else if(!this.props.match.params.profileid) {
            updateProfile = <div className="update-profile-btn">
            <Link to="/updateprofile" className="link"><i class="fas fa-user-edit"></i> Update Profile</Link>
        </div>
        }
        const istyle = {height: '100%', width: '100%', 'object-fit': 'contain'}
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        } else if(this.state.profileUpdated){
            return(<Redirect to="/profile"/>)
        } else {
            let profilePreview = <img src={this.state.preview} style={istyle} alt="profile pic"/>
            if(this.state.preview == null) {
                profilePreview =<i class="fa fa-user fa-7x profile-opacity" aria-hidden="true"></i>
            }
            return(
                <div className="main-wrapper">
                    <Navigation></Navigation>
                    <div className="content-wrapper">
                        <div className="dash-one">
                        <p className="dash-header-blue"><Link to={"/profile/"+this.state.userid}>
            <p>{this.state.name}'s Profile</p>
            </Link></p>
                        {/* </div> */}
                        <div className="course-card-container">
                        <div className="row">
                            <div className="profile-container">
                                <div className="profile">
                                    {profilePreview}
                                </div>
                            </div>
                            
                            <div className="profile-form">
                                <div className="row row-style">
                                    <p className="profile-headers">Name :</p>
                                    <p>{this.state.name}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">Email :</p>
                                    <p>{this.state.email}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">Phone Number :</p>
                                    <p>{this.state.phonenumber}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">About Me :</p>
                                    <p>{this.state.aboutme}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">City :</p>
                                    <p>{this.state.city}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">Country :</p>
                                    <p>{this.state.country}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">Company :</p>
                                    <p>{this.state.company}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">School :</p>
                                    <p>{this.state.school}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">Hometown :</p>
                                    <p>{this.state.hometown}</p>
                                </div>
                                <div className="row">
                                    <p className="profile-headers">Languages (comma separated) :</p>
                                    <p>{this.state.languages}</p>
                                </div>
                                <div className="row row-style">
                                    <p className="profile-headers">Gender :</p>
                                    <p>{this.state.gender}</p> 
                                </div>
                            </div>

                            {updateProfile}
                        </div> 
                        </div>
                    </div>
                    </div>
                </div>
                
            )
        }
    }
}

export default Profile;