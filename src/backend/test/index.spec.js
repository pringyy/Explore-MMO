const server = require('../index');
var supertest = require('supertest');
var chai = require('chai');

global.app = server;
global.expect = chai.expect;
global.request = supertest(server);

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

    it('Tests if login is working', function(done){
        request.post('/login')
        .send({ username: 'testuser123', password: 'testuser123'})
        .expect(200)
        .end(function(err, res) {
          done(err);
        });
    });


    it('Tests if delete account is working', function(done){
        request.post('/deleteAccount')
        .send({ username: 'testuser123'})
        .expect(200)
        .end(function(err, res) {
          done(err);
        });
    });


});