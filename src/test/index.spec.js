const server = require('../index');
var supertest = require('supertest');
var chai = require('chai');

global.app = server;
global.expect = chai.expect;
global.request = supertest(server);

//Stores JWT token from cookies in order to check the system validates using them correctly
var jwt;

//All the below are the Unit Tests for the backend system
describe('Backend Tests', function (){

  it('Should return 401 as user is not logged into system', function(done){
      request.get('/play')
      .expect(401)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Should return login page to user', function(done){
      request.get('/')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Should return registration page to user', function(done){
      request.get('/register')
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Should return 404 error page as request does not exist', function(done){
      request.get('/doesnotexist')
      .expect(404)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if the registration is working', function(done){
      request.post('/register')
      .send({ username: 'testuser123', email: "testuser123@gmail.com", password: 'testuser123'})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests to make sure the system does not register same details twice', function(done){
      request.post('/register')
      .send({ username: 'testuser123', email: "testuser123@gmail.com", password: 'testuser123'})
      .expect(400)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests to make sure the system does not attempt to register invalid details', function(done){
      request.post('/register')
      .send({ username: 'test', email: "testuser123", password: 'test'})
      .expect(400)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if login is working with incorrect details', function(done){
    request.post('/login')
    .send({ username: 'testuser1231312321412', password: 'tqwqweqweqweqw'})
    .expect(400)
    .end(function(err, res) {
        done();
    });
  });

  it('Tests if login is working with correct details', function(done){
      request.post('/login')
      .send({ username: 'testuser123', password: 'testuser123'})
      .expect(200)
      .end(function(err, res) {
          jwt = res.headers['set-cookie'][1].slice(11).split(';')[0];
          done();
      });
  });


  it('Should return play page to user as they are now logged in', function(done){
      request.get('/play')
      .send({refreshToken:jwt})
      .expect(200)
      .end(function(err, res) {
          done(err);
      });
  });

  it('Tests if chat is working', function(done){
      request.post('/submitChat')
      .send({message: "test", refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if retrieving quest data from the back to front end works', function(done){
      request.get('/questQuery')
      .send({refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if database is updated when quest 1 is completed', function(done){
      request.post('/completedQuest')
      .send({quest: 'quest1', refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if database is updated when quest 2 is completed', function(done){
      request.post('/completedQuest')
      .send({quest: 'quest2', refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if database is updated when quest 3 is completed', function(done){
      request.post('/completedQuest')
      .send({quest: 'quest3', refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if database is updated when quest 4 is completed', function(done){
      request.post('/completedQuest')
      .send({quest: 'quest4', refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if database is updated when quest 5 is completed', function(done){
      request.post('/completedQuest')
      .send({quest: 'quest5', refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests to see if updating the token works with correct token', function(done){
      request.post('/token')
      .send({refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });


  it('Tests to see if updating the token works with incorrect token', function(done){
      request.post('/token')
      .send({refreshToken: "invalidjwtstring123"})
      .expect(401)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if logout is working with correct cookie', function(done){
      request.post('/logout')
      .send({refreshToken: jwt})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });

  it('Tests if logout returns error if cookie is invalid', function(done){
      request.post('/logout')
      .send({refreshToken: "invalidCookie123"})
      .expect(401)
      .end(function(err, res) {
        done(err);
      });
  });
  
  it('Tests if reset password is working when the email is correct', function(done){
    request.post('/forgotPassword')
      .send({ email: 'testuser123@gmail.com'})
      .expect(200)
      .end(function(err, res) {
        done(err);
    });
  });

  it('Tests if reset password is working when the email is incorrect', function(done){
      request.post('/forgotPassword')
      .send({ email: 'testuser123qwdwqdqwdqwdqwd21331231@gmail.com'})
      .expect(400)
      .end(function(err, res) {
          
        done(err);
      });
  });   

  it('Tests if reset password is throwing an error when the token is incorrect', function(done){
      request.post('/resetPassword')
      .send({ password: "newpassword123",
          verifiedPassword: "newpassword123",
          token: "Wrong token"})
      .expect(400)
      .end(function(err, res) {
        done(err);
      });
  });   
  
  it('Tests if delete account is working when username is correct', function(done){
      request.post('/deleteAccount')
      .send({ username: 'testuser123'})
      .expect(200)
      .end(function(err, res) {
        done(err);
      });
  });    
});