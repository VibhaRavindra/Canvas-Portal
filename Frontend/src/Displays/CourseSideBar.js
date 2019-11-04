import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class CourseSideBar extends Component {
    render(){
        const path  =this.props.coursepath;
        const isStudent = this.props.isStudent;
        let permissionLink = ""
        const liStyle={
            'background-color': '#0055a2',
            'border-radius': '3px',
            color: 'white',
            'font-weight': 'bold',
            'text-align': 'left',
            'padding-left':'10px',
            'line-height': '30px',
            'width':'150px'
        }
        const aStyle={color: 'white',}
        if(!isStudent) {
            permissionLink = <li className="courseList"  >
            <Link to ={path +'/permissionGenerator'}>
                <div className="icon-text" >Generate Permissions</div>
            </Link>
        </li>
        }
        
        return(
            <div className="course-sidebar-wrapper">
                <nav className="course-nav-sidebar">
                    <ul className="course-sidebar-components">
                        <li className="courseList">
                            <Link to ={path +'/home'}>
                                Home 
                            </Link>
                        </li>
                        <li className="courseList">
                            <Link to ={path +'/announcements'}>
                                <div className="icon-text" >Announcements</div>
                            </Link>
                        </li>
                        <li className="courseList" style={liStyle}>
                            <Link to ={path +'/assignments'} >
                                <div className="icon-text" style={aStyle}>Assignments</div>
                            </Link>
                        </li>
                        <li className="courseList">
                            <Link to ={path +'/grades'}>
                                <div className="icon-text">Grades</div>
                            </Link>
                        </li>
                        <li className="courseList">
                            <Link to ={path +'/people'}>
                                <div className="icon-text">People</div>
                            </Link>
                        </li>
                        <li className="courseList">
                            <Link to ={path +'/files'}>
                                <div className="icon-text">Files</div>
                            </Link>
                        </li>
                        <li className="courseList" >
                            <Link to ={path +'/quizzes'}>
                                <div  className="icon-text" >Quizzes</div>
                            </Link>
                        </li>
                        {permissionLink}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default CourseSideBar;