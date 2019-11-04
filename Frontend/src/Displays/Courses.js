import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navigation from './Navigation';
import '../App.css';

class Courses extends Component {
    constructor(props){
        super();
        this.state = {
            courses: [],
            isStudent: true,
            published: null,
            isLoggedIn: true,
            searchString:"",
        }
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
    }
    searchChangeHandler(e){
        this.setState({searchString:e.target.value})
    }
    async componentDidMount(){
        const courseList = await fetch('/getCourses',{
            method: 'GET'
        })
        const coursedetails = await courseList.json();
        this.setState({
            courses : coursedetails.courseList
        });
        const signInUser = await fetch('/isLoggedIn',{
            method: 'GET'
        })
        const responseSignIn = await signInUser.json();
        this.setState({
            isLoggedIn: responseSignIn.isLoggedIn,
            isStudent : responseSignIn.isStudent 
        })
    }
   
    render(){
        let userRole;
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        } else {
            if(this.state.isStudent === true){
                userRole = "Student"
            }else{
                userRole = "Faculty"
            }
        } 
        let courseDetails = this.state.courses.map(course => {
            if(course.course_name.toUpperCase().includes(this.state.searchString.toUpperCase())){
            return(
                <tr>
                    {/* <td onClick={this.courseClick(course.CourseId)}>{course.CourseName}</td> */}
                    <td><Link to={"/courses/"+course.course_id}>
                    {course.dept_id}-{course.course_number} {course.course_name}</Link></td>
                    <td>{course.term_name}</td>
                    <td>{userRole}</td>
                    <td>Yes</td>
                    {/* <td>{course.EnrolledAs}</td>
                    <td>{course.Published}</td> */}
                </tr>
            )
            } else {
                return null;
            }
        })
        return(

            <div className="main-wrapper">
                <Navigation></Navigation>
                <div className="content-wrapper">
                    <div className="dash-one">
                        <p className="dash-header padding-bottom20">All Courses</p>
                    </div>
                    <div className="course-card-container">
                    <input type="text" onChange={this.searchChangeHandler} value={this.state.searchString} className="search-box" name="searchbox" placeholder="Search Courses"/>
                    <table class="table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Term</th>
                                    <th>Enrolled as</th>
                                    <th>Published</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseDetails}
                            </tbody>
                        </table>
                    </div> 
                </div>
            </div>
        )
    }
}

export default Courses;