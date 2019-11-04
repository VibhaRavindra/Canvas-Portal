import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";
import Navigation from './../Navigation';
import './../../App.css';
import CourseSideBar from '../CourseSideBar'

class Announcements extends Component {
    constructor(props){
        super();
        this.state = {
            isLoggedIn: true,
            isStudent:true,
            courseDetails:null,
            searchString:"",
            announcement:{}
        }
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
    }
    searchChangeHandler(e){
        this.setState({searchString:e.target.value})
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

        const assignDetails = await fetch('/getAnnouncement/'+ 
        this.props.match.params.announceid, {
            method:"GET"
        })
        const assignObj = await assignDetails.json();
        this.setState({
            announcement: assignObj
        });
    }
   
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        let header = <p className="dash-header-blue">Announcements</p>
        const cd = this.state.courseDetails;
        if(this.state.courseDetails != null) {
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            {cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}
            </Link> > <Link to={"/courses/"+courseid+"/announcements"}>
            Announcements
            </Link> > <Link to={"/courses/"+courseid+"/announcements/"+this.props.match.params.announceid}>
            {this.state.announcement.title}
            </Link></p>
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
                        <div className="course-quiz-container">
                        <div className="question-box">
                            <div className="header-box">
                                <span className="question-number">
                                <img className="announcement-profile" alt="user" src={"/getRawImage/"+this.state.announcement.userid}/></span>
                                <span className="points">{this.state.announcement.username}</span>
                            </div>
                            <div className="question-answer">
                                <div className="question">
                                {this.state.announcement.title}
                                </div>
                                <div className="answer">
                                {this.state.announcement.content}
                                </div>
                                <div className="answer">
                                {this.state.announcement.timestamp}
                                </div>
                            </div>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Announcements;