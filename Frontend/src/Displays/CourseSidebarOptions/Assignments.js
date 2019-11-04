import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";
import Navigation from './../Navigation';
import './../../App.css';
import CourseSideBar from '../CourseSideBar'

class Assignments extends Component {
    constructor(props){
        super();
        this.state = {
            courses: [],
            isLoggedIn: true,
            isStudent:true,
            courseDetails:null,
            searchString:"",
            assignments:[]
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

        const assignDetails = await fetch('/getAssignments/'+ 
        this.props.match.params.courseid, {
            method:"GET"
        })
        const assignObj = await assignDetails.json();
        this.setState({
            assignments: assignObj.assignments
        });
    }
   
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        let header = <p className="dash-header-blue">IndividualCourse</p>
        let content = <h1>Assignments for course {courseid}</h1>
        const cd = this.state.courseDetails;
        let nextPage ="assignments"
        if(!this.state.isStudent)
            nextPage ="gradeassignments"
        if(this.state.courseDetails != null) {
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            {cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}
            </Link> > <Link to={"/courses/"+courseid+"/assignments"}>
            Assignments
            </Link> </p>
            let tableRows = this.state.assignments.map(
                (assign) =>{
                    if(assign.name.toUpperCase().includes(this.state.searchString.toUpperCase())){
                        return(
                        <div className="one-quiz-contain">
                            <Link to={"/courses/"+courseid+"/"+nextPage+"/"+assign.id}>
                            <div className="quiz-name">{assign.name}</div>
                            <div className="second-row">
                                <span className="second-row-span"> -/{assign.points} Points</span>
                            </div>
                            </Link>
                        </div>
                        )    
                    } else {
                        return null;
                    }
                }
            );
            let addAssignment=null
            if(!this.state.isStudent){
                addAssignment = <Link to={"/courses/"+courseid+"/addassignment"}><button className="btn btn-primary">Add Assignment</button></Link>
            }
            content = <div className="course-content-wrapper">
            <input className="search-box" type="text" onChange={this.searchChangeHandler} value={this.state.searchString} name="searchbox" placeholder="Search for Assignment"/>
            {addAssignment}
            <div className="quiz-collection-container">
                {tableRows}
            </div>
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

export default Assignments;