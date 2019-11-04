import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";
import Navigation from './../Navigation';
import './../../App.css';
import CourseSideBar from '../CourseSideBar'

class People extends Component {
    constructor(props){
        super();
        this.state = {
            courses: [],
            isLoggedIn: true,
            isStudent:true,
            people:[],
            courseDetails:null,
            searchString:""
        }
        this.deleteHandler = this.deleteHandler.bind(this);
        this.getCoursePeople = this.getCoursePeople.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
    }
    searchChangeHandler(e){
        this.setState({searchString:e.target.value})
    }
    async deleteHandler(e){
        const courseid  =this.props.match.params.courseid
        const deleteRes = await fetch('/deleteStudentFromCourse/'+e.target.name+"/"+courseid,{
            method: 'DELETE'
        })
        const deleteJson = await deleteRes.json();
        if(deleteJson.success) {
            this.getCoursePeople();
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
        this.getCoursePeople();
    }
    async getCoursePeople(){
        const courseid  =this.props.match.params.courseid
        // get all the people for the course.
        const coursePeopleRes = await fetch('/getCoursePeople/'+courseid,{
            method: 'GET'
        })
        const coursePeople = await coursePeopleRes.json();
        this.setState({
            people:coursePeople.people
        });
    }
   
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        let header = <p className="dash-header-blue">People</p>
        const cd = this.state.courseDetails;
        const courseid  =this.props.match.params.courseid
        let peopleRows = null
        if(this.state.courseDetails != null) {
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            {cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}
            </Link> > <Link to={"/courses/"+courseid+"/people"}>
            People
            </Link> </p>
        
        peopleRows = this.state.people.map(
            (people)=>{
                let deleteButton = <td></td>
                if(!this.state.isStudent && people.role==="student") {
                    deleteButton = <td><button className="btn btn-danger" onClick={this.deleteHandler} name={people.id}>Remove</button></td>
                }
                if(people.name.toUpperCase().includes(this.state.searchString.toUpperCase())){
                return(
             <tr>
                 <td><img className="announcement-profile" alt="user" src={"/getRawImage/"+people.id}/></td>
                 <td><Link to={"/profile/"+people.id}>{people.name}</Link></td>
                 <td>{cd.term_name}:{cd.dept_id}-{cd.course_number}</td>
                 <td>{people.role}</td>
                 {deleteButton}
             </tr>   
                )
                } else {
                    return null;
                }
            })
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
                        <div className="course-content-wrapper">
                        <input className="search-box" type="text" onChange={this.searchChangeHandler} value={this.state.searchString} name="searchbox" placeholder="Search People"/>
                        <table className="table table-striped custom-table2">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {peopleRows}
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default People;