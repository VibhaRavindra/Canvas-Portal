import React, { Component } from 'react';
import Navigation from './Navigation'
import {Redirect,Link} from 'react-router-dom'
import Avatar from 'react-avatar-edit'
import '../App.css';

class UpdateProfile extends Component {
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
        this.onCrop = this.onCrop.bind(this)
        this.changeNameHandler = this.changeNameHandler.bind(this)
        this.changeEmailHandler = this.changeEmailHandler.bind(this)
        this.changePhonenumberHandler = this.changePhonenumberHandler.bind(this)
        this.changeAboutmeHandler = this.changeAboutmeHandler.bind(this)
        this.changeCityHandler = this.changeCityHandler.bind(this)
        this.changeCountryHandler = this.changeCountryHandler.bind(this)
        this.changeCompanyHandler = this.changeCompanyHandler.bind(this)
        this.changeSchoolHandler = this.changeSchoolHandler.bind(this)
        this.changeHometownHandler = this.changeHometownHandler.bind(this)
        this.changeLanguagesHandler = this.changeLanguagesHandler.bind(this)
        this.changeGenderHandler = this.changeGenderHandler.bind(this)
        this.resetState = this.resetState.bind(this)
        this.resetForm = this.resetForm.bind(this)
        
        this.submitHandler = this.submitHandler.bind(this)
    }
    async submitHandler(e){
        e.preventDefault();
        const data = new FormData(e.target);
        //if image changed upload image.
        let updateImage = {success:true};
        if(this.state.imageChanged){
            let imageData = new FormData();
            imageData.append('image', this.state.preview);
            const updateImageRes = await fetch('/updateImage',{
                body: imageData,
                method: 'POST'
            })
            updateImage = await updateImageRes.json()
        }
        // upload rest of form data.
        const updateProfileRes = await fetch('/updateProfile',{
            body: data,
            method: 'POST'
        })
        const updateProfile = await updateProfileRes.json();
        const success = updateProfile.success && updateImage.success;
        this.setState({profileUpdated:success});
    }
    onCrop(preview) {
        this.setState({preview:preview, imageChanged:true})
    }

    changeNameHandler(e){
        this.setState({
            name:e.target.value
        })
    }
    changeEmailHandler(e){
        this.setState({
            email:e.target.value
        })
    }
    changePhonenumberHandler(e){
        this.setState({
            phonenumber:e.target.value
        })
    }
    changeAboutmeHandler(e){
        this.setState({
            aboutme:e.target.value
        })
    }
    changeCityHandler(e){
        this.setState({
            city:e.target.value
        })
    }
    changeCountryHandler(e){
        this.setState({
            country:e.target.value
        })
    }
    changeCompanyHandler(e){
        this.setState({
            company:e.target.value
        })
    }
    changeSchoolHandler(e){
        this.setState({
            school:e.target.value
        })
    }
    changeHometownHandler(e){
        this.setState({
            hometown:e.target.value
        })
    }
    changeLanguagesHandler(e){
        this.setState({
            languages:e.target.value
        })
    }
    changeGenderHandler(e){
        this.setState({
            gender:e.target.value
        })
    }
    async resetForm(){
        this.setState({
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
            gender:null
        })
    }
    async resetState(){
        // get the image from backend
        const imageRes = await fetch("/getProfileImage",{
            method:"GET"
        })
        const imageJson = await imageRes.json();
        if(imageJson.success) {
            this.setState({
                preview:imageJson.image
            })
        } 
        // get full profile data from backend
        const profileRes = await fetch("/getProfileData",{
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
            isLoggedIn: responseSignIn.isLoggedIn
        })
        this.resetState();
    }
    render(){
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
                        <p className="dash-header-blue"><Link to={"/profile"}>
            <p>{this.state.name}'s Profile</p></Link></p>
                        </div>
                        
                        <div className="course-card-container profile-contain">
                            <div className="row">
                                <div className="profile-container right-style">
                                    <div className="profile">
                                        {profilePreview}
                                    </div>
                                </div>
                                <Avatar width={200} height={150} onCrop={this.onCrop}/>
                            </div>
                        <form className="updateProfile-form" onSubmit={this.submitHandler}>
                        <div className="row">
                            <p className="profile-headers">Name</p>
                            <input className="input-profile" type="text" required name="name" value={this.state.name} onChange={this.changeNameHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">Email</p>
                            <input className="input-profile" type="email" required name="email" value={this.state.email} onChange={this.changeEmailHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">Phone Number</p>
                            <input className="input-profile" type="phone" name="phonenumber" value={this.state.phonenumber} onChange={this.changePhonenumberHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">About Me</p>
                            <input className="input-profile" type="text" name="aboutme" value={this.state.aboutme} onChange={this.changeAboutmeHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">City</p>
                            <input className="input-profile" type="text" name="city" value={this.state.city} onChange={this.changeCityHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">Country</p>
                            <input className="input-profile" type="text" name="country" value={this.state.country} onChange={this.changeCountryHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">Company</p>
                            <input className="input-profile" type="text" name="company" value={this.state.company} onChange={this.changeCompanyHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">School</p>
                            <input className="input-profile" type="text" name="school" value={this.state.school} onChange={this.changeSchoolHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">Hometown</p>
                            <input className="input-profile" type="text" name="hometown" value={this.state.hometown} onChange={this.changeHometownHandler}></input>
                            </div>
                            <div className="row">
                        <p className="profile-headers">Languages (comma separated)</p>
                            <input className="input-profile" type="text" name="languages" value={this.state.languages} onChange={this.changeLanguagesHandler}></input>
                            </div>
                            <div className="row gender-input">
                        <p className="profile-headers">Gender</p>
                            Male<input type="radio" name="gender" value="male" checked={this.state.gender === "male"} onChange={this.changeGenderHandler}/>
                            
                            Female<input type="radio" name="gender" value="female" checked={this.state.gender === "female"} onChange={this.changeGenderHandler}/> 
                            
                            Other<input type="radio" name="gender" value="other" checked={this.state.gender === "other"} onChange={this.changeGenderHandler}/> 
                            </div>
                            <div className="row">
                           <button className="profile-button" type="submit">Submit</button>
                           </div>
                        </form>
                        </div> 
                    </div>
                </div>
            )
        }
    }
}

export default UpdateProfile;