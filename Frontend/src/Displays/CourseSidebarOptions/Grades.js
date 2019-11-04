import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";
import Navigation from './../Navigation';
import './../../App.css';
import CourseSideBar from '../CourseSideBar'

class Grades extends Component {
    constructor(props){
        super();
        this.state = {
            courses: [],
            isLoggedIn: true,
            isStudent:true,
            courseDetails:null,
            searchString:"",
            grades:[],
            maxTotal:0,
            totalScore:0
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
        const gradeDetails = await fetch('/getGrades/'+ 
        this.props.match.params.courseid, {
            method:"GET"
        })
        const gradeObj = await gradeDetails.json();
        this.setState({
            grades: gradeObj.grades,
            maxTotal:gradeObj.maxTotal,
            totalScore:gradeObj.totalScore
        });
    }
   
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        let header = <p className="dash-header-blue">IndividualCourse</p>
        let content = <p>Grades for course {courseid}</p>
        const cd = this.state.courseDetails;
        if(this.state.courseDetails != null) {
            let totalPercentage = (this.state.totalScore / this.state.maxTotal) * 100;
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            {cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}
            </Link> > <Link to={"/courses/"+courseid+"/grades"}>
            Grades
            </Link> </p>
            content = <p>You do not have any grades for {cd.dept_id}-{cd.course_number}.</p>
            if(this.state.grades.length>0){
            let tableRows = this.state.grades.map(
                (assign) =>{
                    if(assign.name.toUpperCase().includes(this.state.searchString.toUpperCase())){
                        return(
                            <tr>
                                <td>{assign.name}</td>
                                <td>{assign.type}</td>
                                <td>{assign.score}</td>
                                <td>{assign.outof}</td>
                            </tr>
                        )    
                    } else {
                        return null;
                    }
                }
            );
            content = <div className="course-content-wrapper">
            <input className="search-box" type="text" onChange={this.searchChangeHandler} value={this.state.searchString} name="searchbox" placeholder="Search"/>
            <table className="custom-table1 table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Score</th>
                    <th>Out of</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
            </table>
            <table className="custom-table1 table">
                <tbody>
                    <td className="totalContent">Total</td>
                    <td>     </td>
                    <td>     </td>
                    <td>     </td>
                    <td className="score-percentage totalContent">{totalPercentage} %</td>
                    <td className="total-score">{this.state.totalScore} / {this.state.maxTotal}</td>
                </tbody>
            </table>
            </div>
            }
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

export default Grades;