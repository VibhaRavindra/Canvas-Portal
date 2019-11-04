import React, { Component } from 'react';
import Navigation from '../Navigation'
import CourseSideBar from '../CourseSideBar'
import '../../App.css';
import {Redirect, Link } from "react-router-dom";
class PermissionGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            isStudent:false,
            permissions: [],
            courseDetails: null
        }
        this.generateHandler = this.generateHandler.bind(this);
    }
    async generateHandler(e){
        e.preventDefault();
        const data = new FormData(e.target);
        const permissionsResponse = await fetch('/generatePermissions/'+ 
        this.props.match.params.courseid, {
            method:"POST",
            body:data
        })
        const permissions = await permissionsResponse.json();
        this.setState({
            permissions: permissions.permissions
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
        const courseid = this.props.match.params.courseid;
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        } else if(this.state.isStudent){
            return(<Redirect to="/courses"/>)
        } else {
            let header = <h2> Generate permissions for </h2>;
            let cd = this.state.courseDetails;
            if(cd != null) {
                header = <p className="dash-header"><Link to={"/courses/"+courseid}>
            <p>{cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}</p>
            </Link></p>
            }
            let insideHeader = <h2> Generate permissions for </h2>;
            if(cd != null) {
                insideHeader = <h2> Generate permissions for {cd.course_name}</h2>;
            }
            let waitlisted = "0"
            if(cd!=null){
                waitlisted = cd.total_waitlisted
            }
            let permissionTable = ""
            if(this.state.permissions.length>0) {
                let permissionRows = this.state.permissions.map(permissions => {
                    return (
                        <tr><td>{permissions}</td></tr>
                    )
                })
                permissionTable = 
                <div>
                    <h3>Generated permission codes are:</h3> 
                <table className="table">
                {permissionRows}
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
                        <div className="course-content-wrapper">
                        <div className="dash-one">
                            {insideHeader}
                        </div>
                        <div className="form-group">
                            <form onSubmit={this.generateHandler}>
                            <table className="table">
                            <thead>
                            
                            </thead>
                            <tr>
                                <td>Number of waitlisted students</td>
                                <td>{waitlisted}</td>
                            </tr>
                            <tr>
                                <td>Number of permissions to be generated</td>
                                <td><input type="number" name="number" required/></td>
                            </tr>
                            <tr>
                                <td><button className="btn btn-secondary" type="reset">Clear</button></td>
                                <td><button className="btn btn-primary" type="submit">Submit</button></td>
                            </tr>
                            </table>
                            
                            </form>  
                            </div>
                            <div>
                                {permissionTable}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }
}

export default PermissionGenerator;