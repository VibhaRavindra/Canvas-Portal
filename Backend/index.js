const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const multer = require('multer');
const FormData = multer({ dest: './uploads/' });
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { body } = require('express-validator/check');
const mysql  =require('./mysqlData');
var session = require('express-session')

app.use(cookieParser());
app.use(session({secret: "BRahujBqkZDAHMtYKoPP"}));
app.use(bodyParser.json());
    
app.get('/isLoggedIn', (req,res)=>{
    if(req.session.IsLoggedIn){
        res.send({
            isLoggedIn: true,
            IsInvalid: false,
            isStudent:req.session.isStudent,
            userid:req.session.userid
        })
    } else {
        res.send({
            IsInvalid: false,
            isLoggedIn: false
        })
    }
})

app.post('/getUser',[
    body('emailId').isEmail().normalizeEmail(),
    body('password').not().isEmpty().isLength({ min: 5 })
], FormData.none(), (req,res,next) => {
    //console.log(req.session);
    if(req.session.IsLoggedIn){
        res.send({
            isLoggedIn: true,
            IsInvalid: false
        })
    }else{
        try {
            mysql.validateUser(req, res);
        } catch(e) {
            res.send({
                IsInvalid: true,
                isLoggedIn: false,
                errMessage: "Sign In Failed"
            })
        }
    }
    
    }
)

app.put('/addUser',[
    body('username').not().isEmpty().trim().escape(),
    body('emailId').not().isEmpty().isEmail().normalizeEmail(),
    body('password').not().isEmpty().isLength({ min: 5 }),
    body('employee').not().isEmpty().trim().escape()], FormData.none(), (req,res,next) => {
        if(req.session.IsLoggedIn){
            res.send({
                isInvalid: false
            })
        }else{
        try {
            mysql.addUser(req.body.username, req.body.emailId, req.body.password, req.body.employee, res);
        } catch(e) {
            res.send({
                isInvalid: true,
                errMessage: "Sign Up Failed"
            })
        }
    }
    }
)

app.get('/getDepartment', (req, res, next) => {
    // res.send({subject:selectsubject});
    if(req.session.IsLoggedIn){
        try {
            mysql.getDepartment(res);
        } catch(e) {
            res.send({department:[]});
        }
    } else{
        res.send({department:[]});
    }
})

app.get('/getTerms', (req, res, next) => {
    // res.send({terms:terms});
    if(req.session.IsLoggedIn){
        try {
            mysql.getTerm(res);
        } catch(e) {
            res.send({terms:[]});
        }
    } else{
        res.send({terms:[]});
    }
})
app.put('/addAssignment/:courseid',FormData.none(), (req, res) => {
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            mysql.addAssignment(req, res)
        } catch(e) {
            res.send({success:false})
        }
    } else {
        res.send({success:false})
    }
})
app.get('/getGrades/:courseid', (req, res, next) => {
    if (req.session.IsLoggedIn) {
        try{
            mysql.getGrades(req, res)
        } catch(e) {
            res.send({grades:[],maxTotal:0,totalScore:0})
        }
    } else {
        res.send({grades:[],maxTotal:0,totalScore:0})
    }
})
app.get('/getCourses', (req, res, next) => {
    // res.send({courses:courses});
    
    if (req.session.IsLoggedIn) {
        try{
            mysql.getCourses(req, res)
        } catch(e) {
            res.send({courseList:[]})
        }
    } else {
        res.send({courseList:[]})
    }
})
app.post("/updateGrade",FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            mysql.updateGrade(req,res);
        } catch(e){
            res.send({success:false})
        }
    } else {
        res.send({success:false})
    }
})
app.get("/getAssignDetails/:assignid",(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getAssignDetails(req.params.assignid,res);
        } catch(e){
            res.send({})
        }
    } else {
        res.send({})
    }
})

app.post("/addAnnouncements/:courseid",FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            mysql.addAnnouncements(req,res);
        } catch(e){
            res.send({success:false})
        }
    } else {
        res.send({success:false})
    }
})
app.get("/getAnnouncements/:courseid",(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getAnnouncements(req.params.courseid,res);
        } catch(e){
            res.send({announcements:[]})
        }
    } else {
        res.send({announcements:[]})
    }
})
app.get("/getFile/:fileid",FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getFile(req.params.fileid,res);
        } catch(e){
            res.send(404)
        }
    } else {
        res.send(404)
    }
})
app.get("/getSubmissionFile/:submissionid",FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn) {
        mysql.getSubmissionFile(req,req.params.submissionid,res);
    } else {
        res.send(404)
    }
})

app.get("/getAllSubmissions/:assignmentid",FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            const assignmentid = req.params.assignmentid
            mysql.getAllSubmissions(assignmentid, res)
        } catch(e) {
            console.log(e);
            res.send({submissions:[]})
        }
    } else{
        res.send({submissions:[]})
    }
})


app.get("/getSubmissions/:courseid/:assignmentid",FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn && req.session.isStudent) {
        try{
            const courseid = req.params.courseid
            const studentid = req.session.userid
            const assignmentid = req.params.assignmentid
            mysql.getSubmissions(courseid,assignmentid, studentid, res)
        } catch(e) {
            console.log(e);
            res.send({submissions:[]})
        }
    } else{
        res.send({submissions:[]})
    }
})
app.post("/uploadFile/:courseid",FormData.single("file"),(req,res)=>{
    if (req.session.IsLoggedIn && req.file && !req.session.isStudent) {
        try{
            const courseid = req.params.courseid
            const localfilename = req.file.filename
            const size = req.file.size
            var powerindex = Math.floor( Math.log(size) / Math.log(1024))
            var humanSize =( size / Math.pow(1024, powerindex) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][powerindex];
            const userfilename = req.file.originalname.replace(/[^a-zA-Z0-9\.]/g,"_");
            mysql.uploadFile(courseid, localfilename, userfilename, humanSize, res)
        } catch(e) {
            console.log(e);
            res.send({success:false})
        }
    } else{
        res.send({success:false})
    }
})

app.post("/submitAssignment/:assignmentId",FormData.single("submissionfile"),(req,res)=>{
    if (req.session.IsLoggedIn && req.file) {
        try{
            const studentid = req.session.userid
            const assignmentid = req.params.assignmentId
            const localfilename = req.file.filename
            const userfilename = req.file.originalname.replace(/[^a-zA-Z0-9\.]/g,"_");
            mysql.submitAssignment(studentid, assignmentid, localfilename, userfilename, res)
        } catch(e) {
            console.log(e);
            res.send({success:false})
        }
    } else{
        res.send({success:false})
    }
})

app.get('/getFiles/:courseid',(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getFiles(req, res)
        } catch(e) {
            res.send({files:[]})
        }
    } else{
        res.send({files:[]})
    }
})

app.get('/getAssignments/:courseid',(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getAssignments(req, res)
        } catch(e) {
            res.send({assignments:[]})
        }
    } else{
        res.send({assignments:[]})
    }
})

app.get('/getQuiz/:quizid',(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getQuiz(req, res)
        } catch(e) {
            res.send({quiz:null})
        }
    } else{
        res.send({quiz:null})
    }
})
app.get('/getQuestions/:quizid',(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getQuestions(req, res)
        } catch(e) {
            res.send({questions:[]})
        }
    } else{
        res.send({questions:[]})
    }
})

app.post('/submitAnswers/:quizid',FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.submitAnswers(req, res)
        } catch(e) {
            res.send({success:false})
        }
    } else{
        res.send({success:false})
    }
})
app.get('/getRawImage/:userid',(req,res)=>{
    const userid = req.params.userid
    mysql.getRawImage(userid,res);
})
app.delete('/deleteStudentFromCourse/:studentid/:courseid',(req,res)=>{
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            mysql.deleteStudentFromCourse(req, res)
        } catch(e) {
            res.send({success:false})
        }
    } else{
        res.send({success:false})
    }
})
app.get('/getCoursePeople/:courseid',(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getCoursePeople(req, res)
        } catch(e) {
            res.send({people:[]})
        }
    } else{
        res.send({people:[]})
    }
})
app.get('/getQuizzes/:courseid',(req,res)=>{
    if (req.session.IsLoggedIn && req.session.isStudent) {
        try{
            mysql.getQuizzes(req, res)
        } catch(e) {
            res.send({quizzes:[]})
        }
    } else{
        res.send({quizzes:[]})
    }
})
app.get('/getCourseDetails/:courseid',(req,res)=>{
    if (req.session.IsLoggedIn) {
        try{
            mysql.getCourseDetails(req, res)
        } catch(e) {
            res.send({courses:[]})
        }
    } else{
        res.send({})
    }
})

app.post('/updateImage', FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn){
        try{
            mysql.updateImage(req,res);
        }catch{
            res.send({success:false})
        }
    }else{
        res.send({success:false})
    }
})

app.post('/updateProfile', FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn){
        try{
            mysql.updateProfile(req,res);
        }catch{
            res.send({success:false})
        }
    }else{
        res.send({success:false})
    }
})

app.get('/getProfileImage', FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn){
        try{
            mysql.getProfileImage(req.session.userid,res);
        }catch{
            res.send({success:false})
        }
    }else{
        res.send({success:false})
    }
})

app.get('/getProfileImage/:userid', FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn){
        try{
            mysql.getProfileImage(req.params.userid,res);
        }catch{
            res.send({success:false})
        }
    }else{
        res.send({success:false})
    }
})

app.get('/getProfileData/:userid', FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn){
        try{
            mysql.getProfileData(req.params.userid,res);
        }catch{
            res.send({success:false})
        }
    }else{
        res.send({success:false})
    }
})
app.get("/getAnnouncement/:announceid",(req,res)=>{
    if (req.session.IsLoggedIn){
        try{
            mysql.getAnnouncement(req.params.announceid,res);
        }catch{
            res.send({})
        }
    }else{
        res.send({})
    }
})
app.get('/getProfileData', FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn){
        try{
            mysql.getProfileData(req.session.userid,res);
        }catch{
            res.send({success:false})
        }
    }else{
        res.send({success:false})
    }
})
app.post('/addCourse',[
    body('courseid').not().isEmpty().trim().escape().isNumeric(),
    body('coursename').not().isEmpty().trim().escape(),
    body('department').not().isEmpty().trim().escape(),
    body('term').not().isEmpty().trim().escape(),
    body('coursedesc').not().isEmpty().trim().escape(),
    body('courseroom').not().isEmpty().trim().escape(),
    body('coursecapacity').not().isEmpty().trim().escape().isNumeric(),
    body('waitcapacity').not().isEmpty().trim().escape().isNumeric()
],FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            mysql.addCourse(req, res)
        } catch(e) {
            res.send({success:false})
        }
    } else{
        res.send({success:false})
    }
})

app.post('/generatePermissions/:courseid',[
    body('number').not().isEmpty().trim().escape().isNumeric()], 
    FormData.none(),(req,res)=>{
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            mysql.generatePermissions(req, res)
        } catch(e) {
            res.send({permissions:[]})
        }
    } else{
        res.send({permissions:[]})
    }
})

app.post("/createQuiz", (req,res)=>{
    if (req.session.IsLoggedIn && !req.session.isStudent) {
        try{
            mysql.createQuiz(req, res)
        } catch(e) {
            res.send({success:false})
        }
    } else {
        res.send({success:false})
    }
})
app.post('/searchCourses', [
    body('term').not().isEmpty().trim().escape(),
    body('department').not().isEmpty().trim().escape(),
    body('condition').trim().escape(),
    body('courseNumber').trim().escape(),
    body('courseName').trim().escape()
    ], FormData.none(), (req,res)=>{
        if (req.session.IsLoggedIn) {
            try{
                mysql.searchCourses(req, res)
            } catch(e) {
                res.send({courses:[]})
            }
        } else {
            res.send({courses:[]})
        }
})

app.get('/logout',(req, res, next) => {
    req.session.destroy();
    res.send({isLoggedIn: false})
})

app.get('/getEnrollmentData', (req,res) => {
    // console.log("req.query.courseid"+req.query.courseid);
    if (req.session.IsLoggedIn) {
        try{
            mysql.getEnrollmentData(req, res)
        } catch(e) {
            res.send({courseEnrollment:[]})
        }
    } else {
        res.send({courseEnrollment:[]})
    }
})

app.post('/addCourseEnrolled', (req,res) => {
    if (req.session.IsLoggedIn) {
        try{
            mysql.addCourseEnrolled(req, res)
        } catch(e) {
            res.send({addCourseEnrollment:[]})
        }
    } else {
        res.send({addCourseEnrollment:[]})
    }
})

app.post('/addCourseWithPermission', FormData.none(), (req,res) => {
    if (req.session.IsLoggedIn) {
        try{
            mysql.addCourseWithPermission(req, res)
        } catch(e) {
            res.send({addCourseEnrollment:[]})
        }
    } else {
        res.send({addCourseEnrollment:[]})
    }
})

app.delete('/dropCourseEnrolled', (req,res) => {
    if (req.session.IsLoggedIn) {
        try{
            mysql.dropCourseEnrolled(req, res)
        } catch(e) {
            res.send({dropCourseEnrollment:[]})
        }
    } else {
        res.send({dropCourseEnrollment:[]})
    }
})

app.put('/waitlistCourse', (req,res) => {
    if (req.session.IsLoggedIn) {
        try{
            mysql.waitlistCourse(req, res)
        } catch(e) {
            res.send({waitlistCourse:[]})
        }
    } else {
        res.send({waitlistCourse:[]})
    }
})



var nodejs_server = app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = nodejs_server