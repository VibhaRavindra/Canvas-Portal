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
            announcements:[]
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

        const assignDetails = await fetch('/getAnnouncements/'+ 
        this.props.match.params.courseid, {
            method:"GET"
        })
        const assignObj = await assignDetails.json();
        this.setState({
            announcements: assignObj.announcements
        });
    }
   
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        let header = <p className="dash-header-blue">Announcements</p>
        let content = <h1>Announcements for course {courseid}</h1>
        const cd = this.state.courseDetails;
        if(this.state.courseDetails != null) {
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            {cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}
            </Link> > <Link to={"/courses/"+courseid+"/announcements"}>
            Announcements
            </Link> </p>
            let tableRows = this.state.announcements.map(
                (announce) =>{
                    if(announce.title.toUpperCase().includes(this.state.searchString.toUpperCase()) || announce.content.toUpperCase().includes(this.state.searchString.toUpperCase())){
                        return(
                            <tr>
                                <td >
                                <span><img className="announce-profile" alt="user" src={"/getRawImage/"+announce.userid}/></span>
                                </td>
                                <td>
                                    <div className="announce-title"><Link to={"/courses/"+courseid+"/announcements/"+announce.id}>{announce.title}</Link></div>
                                    <div className="announce-content">{announce.content.substring(0,60)}</div>
                                </td>
                                <td className="col-2">
                                    <div className="posted-on">Posted on:</div>
                                    <div className="posted-timestamp">{announce.timestamp}</div>
                                </td>
                            </tr>
                        )    
                    } else {
                        return null;
                    }
                }
            );
            let addAnnouncement=null
            if(!this.state.isStudent){
                addAnnouncement = <Link to={"/courses/"+courseid+"/addAnnouncement"}><button className="btn btn-primary">Add Announcement</button></Link>
            }
            content = <div className="course-content-wrapper">
            <input className="search-box" type="text" onChange={this.searchChangeHandler} value={this.state.searchString} name="searchbox" placeholder="Search Annoucement"/>
            {addAnnouncement}
            <table className="table">
                <div className=""></div>
                <thead>
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

export default Announcements;