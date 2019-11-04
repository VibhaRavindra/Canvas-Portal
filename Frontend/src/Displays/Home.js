import React, { Component } from 'react';
import Navigation from './Navigation'
import CourseSideBar from './CourseSideBar'
import '../App.css';
import {Redirect, Link } from "react-router-dom";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            isStudent:true,
            courseDetails: null
        }
    }
    async componentDidMount(){
        const signInUser = await fetch('/isLoggedIn',{
            method: 'GET'
        })
        const responseSignIn = await signInUser.json();
        this.setState({
            isLoggedIn: responseSignIn.isLoggedIn,
            isStudent: responseSignIn.isStudent
        });
        const getCourseDetails = await fetch('/getCourseDetails/'+ 
        this.props.match.params.courseid, {
            method:"GET"
        })
        const courseDetails = await getCourseDetails.json();
        this.setState({
            courseDetails: courseDetails
        });
    }
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        let header = <p className="dash-header-blue">IndividualCourse</p>
        let content = <h1>IndividualCourse {courseid}</h1>
        const cd = this.state.courseDetails;
        if(this.state.courseDetails != null) {
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            <p>{cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}</p>
            </Link></p>
            content = <div className="course-content-wrapper">
            <div className="dash-two">
                <div className="header1">{cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}</div>
            </div>
            <div className="home-content">
                <div className="row row-style">
                    <p className="profile-headers">Instructor :</p>
                    <p>{cd.faculty_name}</p>
                </div>
                <div className="row row-style">
                    <p className="profile-headers">Email :</p>
                    <p>{cd.faculty_email}</p>
                </div>
                <div className="row row-style">
                    <p className="profile-headers">Classroom :</p>
                    <p>{cd.room}</p>
                </div>
            </div>
            <h3 className="padding-bottom">Course Description</h3>
            <div>{cd.desc}</div>
            </div>
        }
        return(
            <div className="main-wrapper">
                <Navigation></Navigation>
                <div className="content-wrapper">
                    <div className="dash-one">
                        {header}
                    </div>
                    <div className="course-main-wrapper">
                        <div className="clearfix"></div>
                        <CourseSideBar coursepath={"/courses/"+courseid} isStudent={this.state.isStudent}></CourseSideBar>
                            {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;