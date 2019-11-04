import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import '../App.css';
import Navigation from './Navigation'

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dept_id: 0,
            course_number: 0,
            course_name: 0,
            number_of_courses: 0,
            courseList: [],
            isLoggedIn: true
        }
    }
    async componentDidMount(){
        const signInUser = await fetch('/isLoggedIn',{
            method: 'GET'
        })
        const responseSignIn = await signInUser.json();
        this.setState({
            isLoggedIn: responseSignIn.isLoggedIn
        });
        const getCourseData = await fetch('/getCourses',{
            method: 'GET'
        })
        const getCourseList = await getCourseData.json();
        this.setState({
            courseList: getCourseList.courseList
        })
    }
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        let courseArray = this.state.courseList.map(courseItem => {
            return(
                
                <div className="course-card">
                    <Link to={"/courses/"+courseItem.course_id}>
                    <div className="inner-card"></div>
                    </Link>
                    <div className="bottom-card">
                    <Link to={"/courses/"+courseItem.course_id}>
                    <div className="card-text">
                        <p>{courseItem.dept_id} {courseItem.course_number} {courseItem.course_name} {courseItem.number_of_courses}</p>
                    </div>
                    </Link>
                    <div>
                    <Link to={"/courses/"+courseItem.course_id+"/announcements"}>
                        <i className="fas fa-bullhorn fa-lg fa-icon"></i>
                    </Link>
                    <Link to={"/courses/"+courseItem.course_id+"/assignments"}>
                        <i className="far fa-edit fa-lg fa-icon"></i>
                    </Link>
                        <i className="far fa-comments fa-lg fa-icon"></i>
                    <Link to={"/courses/"+courseItem.course_id+"/files"}>
                        <i className="far fa-folder fa-lg fa-icon"></i>
                    </Link>
                    </div>
                    </div>
                </div>
            )
        })
        return(
            <div className="main-wrapper">
                <Navigation></Navigation>
                <div className="content-wrapper">
                    <div className="dash-one">
                        <p className="dash-header">Dashboard</p>
                    </div>
                    <div className="course-card-holder">
                    <div className="row">
                        {courseArray}
                    </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default Dashboard;