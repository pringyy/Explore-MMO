const server = require('../index');
var supertest = require('supertest');
var chai = require('chai');

global.app = server;
global.expect = chai.expect;
global.request = supertest(server);

var Cookies;

describe('User Authentication Tests', function (){

   

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

    it('Tests to make sure the system does not attempt to register inavlid details', function(done){
        request.post('/register')
        .send({ username: 'test', email: "testuser123", password: 'test'})
        .expect(400)
        .end(function(err, res) {
          done(err);
        });
    });

    

    it('Tests if login is working with correct details', function(done){
        request.post('/login')
        .send({ username: 'testuser123', password: 'testuser123'})
        .expect(200)
        .end(function(err, res) {
            Cookies = res.headers['set-cookie'][1].slice(11).split(';')[0];
            done();
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


    it('Should return play page to user as they are now logged in', function(done){
        request.get('/play')
        .send({refreshToken:Cookies})
        .expect(200)
        .end(function(err, res) {
            done(err);
        });
    });

    
    it('Tests if chat is working', function(done){
        request.post('/submitChat')
        .send({message: "test", refreshToken: Cookies})
        .expect(200)
        .end(function(err, res) {
          done(err);
        });
    });

    it('Tests if retrieving quest data from the back to front end works', function(done){
        request.get('/questQuery')
        .send({refreshToken: Cookies})
        .expect(200)
        .end(function(err, res) {
          done(err);
        });
    });

    it('Tests if database is updated when quest 1 is completed', function(done){
        request.post('/completedQuest')
        .send({quest: 'quest1', refreshToken: Cookies})
        .expect(200)
        .end(function(err, res) {
          done(err);
        });
    });

 

    it('Tests to see if updating the token works with correct token', function(done){
        request.post('/token')
        .send({refreshToken: Cookies})
        .expect(200)
        .end(function(err, res) {
          done(err);
        });
    });


    it('Tests to see if updating the token works with incorrect token', function(done){
        request.post('/token')
        .send({refreshToken: "invalidCookieString123"})
        .expect(401)
        .end(function(err, res) {
          done(err);
        });
    });

    it('Tests if logout is working with correct cookie', function(done){
        request.post('/logout')
        .send({refreshToken: Cookies})
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

    it('Tests if delete account is working when username is correct', function(done){
        request.post('/deleteAccount')
        .send({ username: 'testuser123'})
        .expect(200)
        .end(function(err, res) {
          done(err);
        });
    });   
  

});