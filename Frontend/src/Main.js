import React, { Component } from 'react';
import { Route } from "react-router-dom";
import SignIn from './Displays/SignIn';
import SignUp from './Displays/SignUp';
import Profile from './Displays/Profile';
import Courses from './Displays/Courses';
import Dashboard from './Displays/Dashboard';
import AddCourse from './Displays/AddCourse';
import Home from './Displays/Home';
import EnrollCourse from './Displays/EnrollCourse';
import Announcements from './Displays/CourseSidebarOptions/Announcements';
import ViewAnnouncement from './Displays/CourseSidebarOptions/ViewAnnouncement';
import Assignments from './Displays/CourseSidebarOptions/Assignments';
import AddAssignment from './Displays/CourseSidebarOptions/AddAssignment';
import AddAnnouncement from './Displays/CourseSidebarOptions/AddAnnouncement';
import Grades from './Displays/CourseSidebarOptions/Grades';
import People from './Displays/CourseSidebarOptions/People';
import Files from './Displays/CourseSidebarOptions/Files';
import Quizzes from './Displays/CourseSidebarOptions/Quizzes';
import TakeQuiz from './Displays/CourseSidebarOptions/TakeQuiz';
import ViewAssignment from './Displays/CourseSidebarOptions/ViewAssignment';
import GradeAssignment from './Displays/CourseSidebarOptions/GradeAssignment';

import PermissionGenerator from './Displays/CourseSidebarOptions/PermissionGenerator';
import UpdateProfile from './Displays/UpdateProfile';

class Main extends Component {
    render(){
        return(
            <div>
                <Route path = "/signin" component = {SignIn} />
                <Route path = "/signup" component = {SignUp} />
                <Route exact path = "/profile" component = {Profile} />
                <Route exact path = "/profile/:profileid" component = {Profile} />
                <Route path = "/updateprofile" component = {UpdateProfile} />
                <Route exact path = "/courses" component = {Courses} />
                <Route path = "/dashboard" component = {Dashboard} />
                <Route exact path = "/" component = {Dashboard} />
                <Route exact path = "/courses/:courseid" component = {Home} />
                <Route path = "/courses/:courseid/home" component = {Home} />
                <Route exact path = "/addcourse" component = {AddCourse} />
                <Route exact path = "/courses/:courseid/announcements" component = {Announcements} />
                <Route exact path = "/courses/:courseid/announcements/:announceid" component = {ViewAnnouncement} />
                <Route exact path = "/courses/:courseid/addAnnouncement" component = {AddAnnouncement} />
                <Route exact path = "/courses/:courseid/assignments" component = {Assignments} />
                <Route exact path = "/courses/:courseid/addassignment" component = {AddAssignment} />
                <Route exact path = "/courses/:courseid/assignments/:assignid" component = {ViewAssignment} />
                <Route exact path = "/courses/:courseid/gradeassignments/:assignid" component = {GradeAssignment} />
                <Route exact path = "/courses/:courseid/grades" component = {Grades} />
                <Route exact path = "/courses/:courseid/people" component = {People} />
                <Route exact path = "/courses/:courseid/files" component = {Files} />
                <Route exact path = "/courses/:courseid/quizzes" component = {Quizzes} />
                <Route exact path = "/courses/:courseid/quizzes/:quizid" component = {TakeQuiz} />
                <Route exact path = "/courses/:courseid/permissionGenerator" component = {PermissionGenerator} />
                <Route exact path = "/addcourse/:courseid" component = {EnrollCourse} />
                {/* <Route path = "/courses/:courseid/announcements" component = {Announcements} /> */}
                {/* <Route path = "/profile" component = {Navigation} />
                <Route path = "/dashboard" component = {Navigation} />
                <Route path = "/courses" component = {Navigation} />
                <Route path = "/groups" component = {Navigation} />
                <Route path = "/inbox" component = {Navigation} /> */}
            </div>
        )
    }
}

export default Main;