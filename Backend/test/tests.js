var expect = require('chai').expect;
var app = require('../index');
var request = require('supertest');
var authenicatedObject = request.agent(app);
const userLogin = {
    emailId: 'student1@sjsu.edu', 
    password: 'student1'
  }
  before(function(done){
    authenicatedObject
      .post('/getUser')
      .field('emailId','student1@sjsu.edu')
      .field('password','student1')
      .end(function(err, response){
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('IsInvalid');
        expect(response.body.IsInvalid).to.equal(false);
        done();
      });
  });

  after(function(done){
    app.close(done)
  })

  describe('GET /getCourseDetails/:courseid', function(done){
    it('A logged in user should be able to retrieve course details', function(done){
      authenicatedObject.get('/getCourseDetails/1').end(function(err, response){
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('term_name');
          expect(response.body).to.have.property('dept_id');
          expect(response.body).to.have.property('course_number');
          expect(response.body).to.have.property('course_name');
          expect(response.body).to.have.property('faculty_name');
          expect(response.body).to.have.property('faculty_email');
          expect(response.body).to.have.property('room');
          expect(response.body).to.have.property('desc');
          expect(response.body).to.have.property('total_waitlisted');
          done();
        });
    });
  });

  describe('GET /courses', function(done){
      it('should return non empty list of courses if user is loggedin', function(done){
        authenicatedObject.get('/getCourses').end(function(err, response){
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('courseList');
            expect(response.body.courseList.length).to.not.equal(0);
            done();
          });
      });
    });

    describe('GET /getDepartment', function(done){
        it('Should return non empty number of departments to a loggedin user.', function(done){
          authenicatedObject.get('/getDepartment').end(function(err, response){
              expect(response.statusCode).to.equal(200);
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('department');
              expect(response.body.department.length).to.not.equal(0);
              done();
            });
        });
      });
  
      describe('POST /updateGrade', function(done){
        it('update grade should always return false for a student.', function(done){
          authenicatedObject.post('/updateGrade').end(function(err, response){
              expect(response.statusCode).to.equal(200);
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('success');
              expect(response.body.success).to.equal(false);
              done();
            });
        });
      });

    describe('GET /isLoggedIn', function(done){
        it('should return that user is logged in after logging in', function(done){
          authenicatedObject.get('/isLoggedIn').end(function(err, response){
              expect(response.statusCode).to.equal(200);
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('isLoggedIn');
              expect(response.body).to.have.property('isStudent');
              expect(response.body).to.have.property('userid');
              expect(response.body.isLoggedIn).to.equal(true);
              expect(response.body.isStudent).to.equal(true);
              expect(response.body.userid).to.equal(27);
              done();
            });
        });
      });

      describe('GET /isLoggedIn', function(done){
        it('should NOT return any user before logging in', function(done){
          request(app).get('/isLoggedIn').end(function(err, response){
              expect(response.statusCode).to.equal(200);
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('isLoggedIn');
              expect(response.body).not.to.have.property('isStudent');
              expect(response.body).not.to.have.property('userid');
              expect(response.body.isLoggedIn).to.equal(false);
              done();
            });
        });
      });