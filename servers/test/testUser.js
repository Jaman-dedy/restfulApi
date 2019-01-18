/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const chai = require('chai');
const {expect}=require('chai');
chaiHttp = require('chai-http');
const app = require('../index');
/*
chai.use(chaiHttp);
describe("somr",()=>{
  describe("dskf",()=>{
    chai.request(app)
     .get("/api/v1/users")
     .end((err,res)=>{
       expect(res.body).to.be.an('object');
     })
  })
})*/
describe('Testing user endpoints', () => {
 
    it('All users', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  

    it('Get a specific user', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  

    const error = {
      status : 404,
      message : 'User not found'
    };
    it('Given user Id not found', (done) => {
      request(app)
        .get('/api/v1/users/30')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(error)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  

    const user = {
      id: 1,
      firstname: 'Emmanuel',
      lastname: 'Bush',
      email: 'emabush@gmail.com',
      isAdmin: true
    };
    it('Create a user', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  

    it('Updated user', (done) => {
      request(app)
        .put('/api/v1/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
 

  /*describe('Delete user', () => {
    it('Deleted user', (done) => {
      request(app)
        .delete('/api/v1/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(204, done);
    });
  });*/
});
