/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app');

describe('Testing meetup endpoints', () => {
  describe('All meetups', () => {
    it('All Meetups', (done) => {
      request(app)
        .get('/meetups')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Upcoming meetups', () => {
    it('Upcoming Meetups', (done) => {
      request(app)
        .get('/meetups/upcoming')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('Find a specific meetup', () => {
    it('Get a specific meetup', (done) => {
      request(app)
        .get('/meetups/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Specific meetup not found', () => {
    const error = {
      status: 404,
      error: 'the meetup with the given Id was not found'
    };
    it('Given meetup Id not found', (done) => {
      request(app)
        .get('/meetups/30')
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

  describe('Post a meetup', () => {
    const meetup = {
      id: 1,
      topic: 'Machine learnings',
      loaction: 'Telecom house',
      happeningOn: '2019-01-05',
      tags: 'Artificial intelligence (AI)'
    };
    it('Create a meetup', (done) => {
      request(app)
        .post('/meetups')
        .send(meetup)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Respond to a meetup Rsvp', () => {
    const rsvp = {
      meetup: 1,
      topic: 'Machine learnings',
      status: 'maybe'
    };
    it('Create a meetup', (done) => {
      request(app)
        .post('/meetups/1/rsvps')
        .send(rsvp)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Meetup not found', () => {
    const error = {
      status: 404,
      error: 'the meetup with the given Id was not found'
    };
    it('Given meetup Id not found', (done) => {
      request(app)
        .post('/meetups/30/rsvps')
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

  describe('Delete an existing meetup', () => {
    it('Deleted question', (done) => {
      request(app)
        .delete('/meetups/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Delete a non-existing meetup', () => {
    const error = {
      status: 404,
      error: 'the meetup with the given Id was not found'
    };
    it('Given meetup Id not found', (done) => {
      request(app)
        .delete('/meetups/30')
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
});
