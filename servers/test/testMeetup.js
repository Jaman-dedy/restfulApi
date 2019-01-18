/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
var should= require("should");
const app = require('../index');

describe('Testing meetup endpoints', () => {
  describe('Should return All meetups', () => {
    it('All Meetups', (done) => {
      request(app)
        .get('/api/v1/meetups')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('Upcoming meetups', () => {
    it('Should return Upcoming Meetups', (done) => {
      request(app)
        .get('/api/v1/meetups/upcoming')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('Specific meetup not found', () => {
    const error = {
      status : 404,
      message : 'meetup not found'
    };
    it('Should return Given meetup Id not found', (done) => {
      request(app)
        .get('/api/v1/meetups/30')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(error)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Find a specific meetup', () => {
    it('Should return Get a specific meetup', (done) => {
      request(app)
        .get('/api/v1/meetups/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res)=> {
          res.body.data.location.should.equal('telecom house');
          res.body.data.topic.should.equal('why javascript is the most use langage?');
        done();})
    });
  });
 

  describe('Post a meetup', () => {
    const meetup = {
     
      topic: 'Machine learnings',
      location: 'Telecom house',
      tags: ['Artificial', 'intelligence (AI)']
    };
   

    it('Should test the endpoint Create a meetup', (done) => {
      request(app)
        .post('/api/v1/meetups/')
        .send(meetup)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          res.status.should.equal(201);         
          res.body.data[0].topic.should.equal('Machine learnings');
          res.body.data[0].location.should.equal('Telecom house');
         
          done();
        });
    });
  });
 
  describe('Respond to a meetup Rsvp', () => {
    const rsvp = {
      meetup: 1,
      user: 1,
      response: 'maybe'
    };
    it('Should test the meetup rsvp', (done) => {
      request(app)
        .post('/api/v1/meetups/1/rsvps')
        .send(rsvp)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.data[0].meetup.should.equal(1);
          res.body.data[0].user.should.equal(1);
          res.body.data[0].response.should.equal('maybe');
          done();
        });
    });
  });


});