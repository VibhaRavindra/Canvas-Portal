import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import Navigation from './Navigation';
import '../App.css';

class AddCourse extends Component {
    constructor(props){
        super(props);
        this.state = { 
            department: [],
            terms: [],
            courses: [],
            noCourseReturned: false,
            isLoggedIn: true,
            isStudent:true,
            courseAdded:false
        };
        this.submitAddCourse = this.submitAddCourse.bind(this);
        this.addCourseHandler = this.addCourseHandler.bind(this);
    }

    async submitAddCourse(e){
        e.preventDefault();
        const data = new FormData(e.target);
        //console.log(data.values);
        const responseSearchCourses = await fetch('/searchCourses',{
            body: data,
            method: 'POST'
        })
        const searchCourses = await responseSearchCourses.json();
        const nocourses = searchCourses.courses.length === 0;
        this.setState({
            courses: searchCourses.courses,
            noCourseReturned: nocourses
        })
    }

    async addCourseHandler(e){
        e.preventDefault();
        const data = new FormData(e.target);
        const addCourseResponse = await fetch('/addCourse',{
            body: data,
            method: 'POST'
        })
        const addCourse = await addCourseResponse.json();
        if(addCourse.success) {
            alert("Course added, redirecting to /courses.")
        } else {
            alert("Course already exists. Failed to add course.")
        }
        this.setState({
            courseAdded: addCourse.success
        })
        
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
        const getDepartment = await fetch('/getDepartment',{
            method: 'GET'
        })
        const subjectReceived = await getDepartment.json();
        this.setState({
            department : subjectReceived.department 
        });

        const getTerms = await fetch("/getTerms", {
            method: 'GET'
        });
        const termsReceived  =await getTerms.json();
        this.setState({
            terms : termsReceived.terms
        });
    }

    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        if(this.state.courseAdded) {
            return(<Redirect to="/courses"/>)
        }
        let deptDetails = this.state.department.map(departments => {
            return(
                <option value={departments.value}>{departments.departmentName}</option>
            )
        })

        let termDetails = this.state.terms.map(terms => {
            return (
                <option value={terms.value}>{terms.term}</option>
            )
        })
        if(this.state.isStudent) {
        let courseDetails = this.state.courses.map( course => {
                return (
                    <tr>
                        <td>{course.deptid} {course.coursenumber}</td>
                        <td>{course.coursename}</td>
                        <td>{course.facultyname}</td>
                        <td>{course.room}</td>
                        <td>{course.status}</td>
                        <td><Link to={"/addcourse/"+course.courseid}><button className="custom-button-2">Select</button></Link></td>
                    </tr>
                )
            })
        let noCourseMessage;
        if (this.state.noCourseReturned) {
            noCourseMessage = <div className="alert alert-warning" role="alert"> No classes found </div>;
        }
        return(  
            <div className="main-wrapper">
                <Navigation></Navigation>
                <div className="content-wrapper">
                    <div className="dash-one">
                        <p className="dash-header padding-bottom20">Add Course</p>
                    </div>
                    <div className="course-card-container add-course-container">
                    <form className="form" onSubmit={this.submitAddCourse}>
                        <p className='search-class-text padding-bottom20'>Search for classes</p>
                        <p className="select-class-text">Select Term : </p>
                        <div class="form-group">
                            <select className="form-control"  name="term">
                                {termDetails}
                            </select>
                        </div>
                        <p className="select-class-text">Select Department : </p>
                        <div class="form-group">
                            <select className="form-control"  name="department">
                                {deptDetails}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <p className="select-class-text">Course Number : </p>
                            <div className="row">
                                <select className="form-control select-option" name="condition">
                                    <option value="greater">greater than or equal to</option>
                                    <option value="exactly" selected>is exactly</option>
                                    <option value="lesser">less than or equal to</option>
                                </select>
                                <input className="form-control input-option" type="text" name="courseNumber"></input>
                            </div>
                            <p className="select-class-text padding-top20">Course Name : </p>
                            <input className="form-control" type="text" name="courseName" placeholder="Course name"></input>
                        </div>
                        <div className="padding-top20">
                            <button className="custom-button-2" type="reset">Clear</button>
                            <button className="custom-button-2 padding-left" type="submit">Submit</button>
                        </div>
                    </form>
                    <p/>
                    {noCourseMessage}
                    <table className="table table-striped custom-table2 margin-top50">
                    {courseDetails}
                    </table>
                    </div> 
                    
                </div>
            </div>
        )
        } else {
            //faculty add course form.
            return(
            <div className="main-wrapper">
                <Navigation></Navigation>
                <div className="content-wrapper">
                    <div className="dash-one">
                        <p className="dash-header">Add Course</p>
                    </div>
                
                <div>
                    <form onSubmit={this.addCourseHandler}>
                    <table className="table">
                        <tr>
                            <td>Course id</td>
                            <td><input name="courseid" type="number" required/></td>
                        </tr>
                        <tr>
                            <td>Course Name</td>
                            <td><input name="coursename" type="text" required/></td>
                        </tr>
                        <tr>
                            <td>Course Dept</td>
                            <td><select className="form-control"  name="department">
                                {deptDetails}
                            </select></td>
                        </tr>
                        <tr>
                            <td>Course Term</td>
                            <td><select className="form-control"  name="term">
                                {termDetails}
                            </select></td>
                        </tr>
                        <tr>
                            <td>Course Description</td>
                            <td><textarea name="coursedesc" required/></td>
                        </tr>
                        <tr>
                            <td>Course Room</td>
                            <td><input name="courseroom" type="text" required/></td>
                        </tr>
                        <tr>
                            <td>Course Capacity</td>
                            <td><input name="coursecapacity" type="number" required/></td>
                        </tr>
                        <tr>
                            <td>Waitlist capacity</td>
                            <td><input name="waitcapacity" type="number" required/></td>
                        </tr>
                        <tr>
                        <td><button className="btn btn-secondary" type="reset">Clear</button></td>
                        <td><button className="btn btn-primary" type="submit">Submit</button></td>
                        </tr>
                    </table>
                    </form>
                </div>
            </div>
            </div>
            )
        }
    }
}

export default AddCourse;