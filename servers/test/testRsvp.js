/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../index');

describe('Testing Rsvps endpoints', () => {
  
    it('Should return All rsvps', (done) => {
      request(app)
        .get('/api/v1/rsvps')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
 
    const error = {
      status : 404,
      message : 'Rsvp not found'
    };
    it('Should return a Given rsvp Id not found', (done) => {
      request(app)
        .get('/api/v1/rsvps/30')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(error)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
 

    it('Should return Get a specific rsvp', (done) => {
      request(app)
        .get('/api/v1/rsvps/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  

    const rsvp = {
      id: 1,
      meetup: 'Javascript subfunctions',
      user: 1,
      response: 'yes'
    };
    it('Should return Create a rsvp', (done) => {
      request(app)
        .post('/api/v1/rsvps')
        .send(rsvp)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  

 /* describe('udpate rsvp', () => {
    it('Updated rsvp', (done) => {
      request(app)
        .patch('/api/v1/rsvps/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  }); */

 /* describe('Delete rsvp', () => {
    it('Deleted rsvp', (done) => {
      request(app)
        .delete('/api/v1/rsvps/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });*/
});
