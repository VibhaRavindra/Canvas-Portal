import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";
import Navigation from './../Navigation';
import './../../App.css';
import CourseSideBar from '../CourseSideBar'

class Files extends Component {
    constructor(props){
        super();
        this.state = {
            files: [],
            isLoggedIn: true,
            searchString:"",
            addClicked:false,
            isStudent:true,
            file:null
        }
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.setFile = this.setFile.bind(this);
        this.getFiles = this.getFiles.bind(this);
    }
    setFile(e){
        console.log(e.target.files[0])
        this.setState({file:e.target.files[0]});
    }
    async uploadFile(e){
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('file',this.state.file, this.state.file.name)
        let subResponse = await fetch("/uploadFile/"+this.props.match.params.courseid, {
            method:'POST',
            body:formdata
        })
        const subJson = await subResponse.json();
        if(subJson.success) {
            alert("Submission successful")
            this.getFiles();
        } else {
            alert("Submission failed")
        }
    }
    addClickHandler(){
        this.setState({addClicked:true})
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
        this.getFiles();
    }
    async getFiles(){
        const fileDetails = await fetch('/getFiles/'+ 
        this.props.match.params.courseid, {
            method:"GET"
        })
        const fileJson = await fileDetails.json();
        this.setState({
            files: fileJson.files,
            addClicked:false
        });
    }
   
    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        let header = <p className="dash-header-blue">Files for Course</p>
        let content = <h1>Files for course {courseid}</h1>
        const cd = this.state.courseDetails;
        if(this.state.courseDetails != null) {
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            {cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}
            </Link> > <Link to={"/courses/"+courseid+"/files"}>
            Files
            </Link></p>
            let tableRows = this.state.files.map(
                (file) =>{
                    if(file.filename.toUpperCase().includes(this.state.searchString.toUpperCase())){
                        return(
                            <tr>
                                <td><a href={"http://localhost:3001/getFile/"+file.fileid}>{file.filename}</a></td>
                                <td>{file.uploaded_timestamp}</td>
                                <td>{file.user_name}</td>
                                <td>{file.size}</td>
                            </tr>
                        )    
                    } else {
                        return null;
                    }
                }
            );
            let addFile=null
            if(!this.state.isStudent){
                addFile = <button className="btn btn-primary" onClick={this.addClickHandler}>Add File</button>
            }
            let uploadForm = null;
            if(this.state.addClicked){
                uploadForm = <div><form onSubmit={this.uploadFile}>
                    <div class="form-group">
                    <label for="fileupload">Select File</label>
                    <input required onChange={this.setFile} type="file" className="form-control-file" accept="application/pdf" name="submissionfile"/></div>
                    <button type="submit" className="btn btn-primary">Upload File</button>
                </form></div>
            }
            content = <div className="course-content-wrapper">
            <input className="search-box" type="text" onChange={this.searchChangeHandler} value={this.state.searchString} name="searchbox" placeholder="Search Files"/>
            {addFile}
            {uploadForm}
            <table className="table table-striped custom-table2">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th>Created By</th>
                    <th>Size</th>
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

export default Files;