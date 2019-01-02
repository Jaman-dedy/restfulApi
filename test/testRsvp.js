/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../app');

describe('Testing Rsvps endpoints', () => {
  describe('All Rsvps', () => {
    it('All rsvps', (done) => {
      request(app)
        .get('/rsvps')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('Find a specific rsvp', () => {
    it('Get a specific rsvp', (done) => {
      request(app)
        .get('/rsvps/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Specific rsvp not found', () => {
    const error = {
      status: 404,
      error: 'Not such Rsvp has ben planed'
    };
    it('Given rsvp Id not found', (done) => {
      request(app)
        .get('/rsvps/30')
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

  describe('Post rsvp', () => {
    const rsvp = {
      id: 1,
      meetup: 'Javascript subfunctions',
      user: 1,
      response: 'yes'
    };
    it('Create a rsvp', (done) => {
      request(app)
        .post('/rsvps')
        .send(rsvp)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('udpate rsvp', () => {
    it('Updated rsvp', (done) => {
      request(app)
        .patch('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Delete rsvp', () => {
    it('Deleted rsvp', (done) => {
      request(app)
        .delete('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
