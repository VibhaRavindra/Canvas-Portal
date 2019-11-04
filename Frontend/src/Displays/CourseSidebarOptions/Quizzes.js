import React, { Component } from 'react';
import { Redirect,Link } from "react-router-dom";
import Navigation from './../Navigation';
import './../../App.css';
import CourseSideBar from '../CourseSideBar'
import QuizDetailsQuestions from "./QuizDetailsQuestions"

class Quizzes extends Component {
    constructor(props){
        super();
        this.state = {
            isLoggedIn: true,
            isStudent:true,
            searchString:"",
            quizzes:[]
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
        if(responseSignIn.isStudent){
            const quizDetails = await fetch('/getQuizzes/'+ 
            this.props.match.params.courseid, {
                method:"GET"
            })
            const quizzes = await quizDetails.json();
            this.setState({
               quizzes: quizzes.quizzes
            });
        }
    }
    

    render(){
        if (!this.state.isLoggedIn) {
            return(<Redirect to="/signin"/>)
        }
        const courseid  =this.props.match.params.courseid
        let header = <p className="dash-header-blue">IndividualCourse</p>
        let content = <h1>Quiz for course {courseid}</h1>
        const cd = this.state.courseDetails;
        if(this.state.courseDetails != null) {
            header = <p className="dash-header-blue"><Link to={"/courses/"+courseid}>
            {cd.term_name}:{cd.dept_id}-{cd.course_number} {cd.course_name}
            </Link> > <Link to={"/courses/"+courseid+"/quizzes"}>
            Quizzes
            </Link></p>
            if(this.state.isStudent){
                // render student view of quizzes.
                if(this.state.quizzes.length>0) {
                    let quizRows = this.state.quizzes.map((quiz)=>{
                        if(quiz.quiz_name.toUpperCase().includes(this.state.searchString.toUpperCase())){
                        return <div className="one-quiz-contain"><Link to={"/courses/"+courseid+"/quizzes/"+quiz.quiz_id}><div>
                            <div className="quiz-name">{quiz.quiz_name}</div>
                            <div className="second-row">
                                <span className="second-row-span">{quiz.num_questions} Questions    |</span>
                                <span className="second-row-span">   {quiz.total_points} Points</span>
                            </div>
                        </div></Link></div>
                        } else {
                            return null;
                        }
                    });
                    content = <div className="course-content-wrapper">
                        <input className="search-box" type="text" onChange={this.searchChangeHandler} value={this.state.searchString} name="searchbox" placeholder="Search for Quiz"/>
                        <div className="quiz-collection-container">
                            {quizRows}
                        </div>
                    </div>
                } else {
                    content = <p> No quizzes available for this course.</p>
                }
            } else {
                // render faculty view of quizzes
                content = <QuizDetailsQuestions courseid={courseid}/>
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
                        <div className="course-card-container profile-contain">
                        {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quizzes;