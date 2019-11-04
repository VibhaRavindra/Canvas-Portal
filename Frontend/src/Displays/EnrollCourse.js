import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Navigation from './Navigation';
import '../App.css';

class EnrollCourse extends Component {
    constructor(props){
        super(props);
        this.state = { 
            courseEnrollment: [],
            terms: [],
            courses: [],
            noCourseReturned: false,
            addCourseStatus: "",
            isLoggedIn: true,
            isStudent:true
        };
        this.enrollHandler = this.enrollHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.waitlistHandler = this.waitlistHandler.bind(this);
        this.permissionHandler = this.permissionHandler.bind(this);
        
        this.setCourseStudentState = this.setCourseStudentState.bind(this);
    }
    async enrollHandler(){
        let course_id = this.state.courseEnrollment.course_id;
        const enroll = await fetch('/addCourseEnrolled',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({course_id:course_id})
        })
        const enrollData = await enroll.json();
        if(enrollData.addCourseEnrollment){
            alert("Successfully Enrolled!");
        }
        else{
            alert("Sorry, Enrollment Unsuccessfull!");
        }
        this.setCourseStudentState();
    }
    async permissionHandler(e){
        e.preventDefault();
        const data = new FormData(e.target);
        const addCourseRes = await fetch('/addCourseWithPermission',{
            body: data,
            method: 'POST'
        })
        const addCourse = await addCourseRes.json();
        if(addCourse.addCourseEnrollment){
            alert("Successfully Enrolled!");
        }
        else{
            alert("Sorry, Enrollment Unsuccessfull!");
        }
        this.setCourseStudentState();
    }
    async dropHandler(){
        let course_id = this.state.courseEnrollment.course_id;
        const drop = await fetch('/dropCourseEnrolled?courseid='+course_id,{
            method: 'DELETE'
        })
        const dropData = await drop.json();
        if(dropData.dropCourseEnrollment){
            alert("Course Successfully Dropped!");
        }
        else{
            alert("Sorry, Unable to drop course!");
        }
        this.setCourseStudentState();
    }
    async waitlistHandler(){
        let course_id = this.state.courseEnrollment.course_id;
        const waitlist = await fetch('/waitlistCourse',{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({course_id:course_id})
        })
        const waitlistData = await waitlist.json();
        if(waitlistData.waitlistCourse){
            alert("Successfully Added to Waitlist!");
        }
        else{
            alert("Sorry, could not add you to the Waitlist!");
        }
        this.setCourseStudentState();
    }
    async setCourseStudentState(){
        const courseid = this.props.match.params.courseid;
        // call the backend for data.
        const enrollmentData = await fetch('/getEnrollmentData?courseid='+courseid,{
            method: 'GET'
        })
        const courseEnrollmentData = await enrollmentData.json();
        this.setState({
            courseEnrollment : courseEnrollmentData.courseEnrollment[0]
        });
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
        this.setCourseStudentState();
    }

    

    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        if(!this.state.isStudent) {
            return(<Redirect to="/courses"/>)
        }
        let requiredAction;
        // const statusMessage;
        const course_id = this.state.courseEnrollment.course_id;
        const course_number = this.state.courseEnrollment.course_number;
        const course_name = this.state.courseEnrollment.course_name;
        const capacity = this.state.courseEnrollment.capacity;
        const total_enrolled = this.state.courseEnrollment.total_enrolled;
        const total_waitlisted = this.state.courseEnrollment.total_waitlisted;
        const courseStatus = this.state.courseEnrollment.courseStatus;
        const studentStatus = this.state.courseEnrollment.studentStatus;
        if(courseStatus === "open" && studentStatus === "NEW"){
            requiredAction = <button onClick={this.enrollHandler} className="custom-button-2">Enroll</button>
        } else if((courseStatus === "open" || courseStatus === "waitlist" || courseStatus === "closed") && studentStatus === "ENROLL"){
            requiredAction = <button onClick={this.dropHandler} className="custom-button-2">Drop</button>
        } else if(courseStatus === "waitlist" && studentStatus === "NEW"){ 
            requiredAction = <button onClick={this.waitlistHandler} className="custom-button-2">Add to Waitlist</button>
        } else if(studentStatus === "WAITLIST"){ 
            requiredAction =
            <form onSubmit={this.permissionHandler}> 
            Permission code:
            <input type="text" className="form-control" name="permissionNumber" />
            <input type="hidden" name="course_id" value={course_id}/>
            <button type="submit" className="custom-button-2">Enroll with permission number</button>
            </form>
        } else if(courseStatus === "closed" && studentStatus !== "ENROLL"){
            requiredAction = <p>Course is closed. No more enrollment allowed.</p>
        }
        // if(this.state.addCourseStatus === true){
        //     statusMessage = <div class="alert alert-success" role="alert">
        //     Successfully Enrolled!
        //   </div>
        // }
        return(  
            <div className="main-wrapper">
                <Navigation></Navigation>
                <div className="content-wrapper">
                    <div className="dash-one">
                        <p className="dash-header padding-bottom20">Enroll Course</p>
                    </div>
                    <div className="course-card-container">
                        <div className="profile-form">
                            <div className="row row-style">
                                <p className="profile-headers">Course ID :</p>
                                <p>{course_id}</p>
                            </div>
                            <div className="row row-style">
                                <p className="profile-headers">Course Number :</p>
                                <p>{course_number}</p>
                            </div>
                            <div className="row row-style">
                                <p className="profile-headers">Course Name :</p>
                                <p>{course_name}</p>
                            </div><div className="row row-style">
                                <p className="profile-headers">Total Enrolled :</p>
                                <p>{total_enrolled}</p>
                            </div>
                            <div className="row row-style">
                                <p className="profile-headers">Total Waitlist :</p>
                                <p>{total_waitlisted}</p>
                            </div>
                            <div className="row row-style">
                                <p className="profile-headers">Course Status :</p>
                                <p>{courseStatus}</p>
                            </div>
                            <div className="row row-style">
                                <p className="profile-headers">Student Status :</p>
                                <p>{studentStatus}</p>
                            </div>
                        {requiredAction}
                        {this.state.addCourseStatus}
                        </div> 
                    </div>

                    

                </div>
            </div>
        )
    }
}

export default EnrollCourse;