import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";
import Navigation from './../Navigation';
import './../../App.css';
import CourseSideBar from '../CourseSideBar'

class GradeAssignment extends Component {
    constructor(props){
        super();
        this.state = {
            isLoggedIn: true,
            isStudent:false,
            submissions:[],
            searchString:""
        }
        this.getSubmissions = this.getSubmissions.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.updateGrade  =this.updateGrade.bind(this)
    }
    async updateGrade(e){
        e.preventDefault()
        const data = new FormData(e.target)
        const updateGrade = await fetch('/updateGrade',{
            method: 'POST',
            body:data
        })
        const updateGradeRes = await updateGrade.json();
        if(!updateGradeRes.success){
            alert("Grade update failed");
        }
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
        this.getSubmissions();
    }

    async getSubmissions(){
        const subDetails = await fetch('/getAllSubmissions/'+this.props.match.params.assignid, {
            method:"GET"
        })
        const subObj = await subDetails.json();
        this.setState({
            submissions: subObj.submissions
        });
    }
   
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        if (this.state.isStudent) {
            return(<Redirect to={"/courses/"+courseid+"/assignments"}/>)
        }
        
        let header = <p className="dash-header">Assignment Submission</p>
        let content = <h1>Grade Assignment Submissions for course {courseid}</h1>
        const cd = this.state.courseDetails;
        if(this.state.courseDetails != null) {
            header = <p className="dash-header"><Link to={"/courses/"+courseid}>
            <p>{cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}</p>
            </Link></p>
            let tableRows = this.state.submissions.map(
                (assign) =>{
                    if(assign.user_name.toUpperCase().includes(this.state.searchString.toUpperCase())){
                    return <tr>
                        <td>{assign.user_name}</td>
                        <td><a href={"http://localhost:3001/getSubmissionFile/"+assign.submission_id}>{assign.user_filename}</a></td>
                        <td>{assign.timestamp}</td>
                        <td><form onSubmit={this.updateGrade}
                    >
                    <input type="hidden" name="submissionid" value={assign.submission_id}/><input type="number" min="0" placeholder={assign.grade} name="grade"/><button type="submit" className="btn btn-primary">Save Grade</button></form></td>
                    </tr>;
                    } else {
                        return null;
                    }
                }
            );
            content = <div className="course-content-wrapper">
            <input type="text" onChange={this.searchChangeHandler} value={this.state.searchString} name="searchbox" placeholder="Search Assignments"/>
            <h3>Assignment Name</h3>
            <p>25 pts</p>
            <p></p>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Assignment File</th>
                    <th>Submission time</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
            </table>
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

export default GradeAssignment;