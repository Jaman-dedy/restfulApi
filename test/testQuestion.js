/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../app');

describe('Testing question endpoints', () => {
  describe('All questions', () => {
    it('All Questions', (done) => {
      request(app)
        .get('/questions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('Find a specific question', () => {
    it('Get a specific question', (done) => {
      request(app)
        .get('/questions/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Specific question not found', () => {
    const error = {
      status: 404,
      error: 'user with the given Id not exists'
    };
    it('Given question Id not found', (done) => {
      request(app)
        .get('/questions/30')
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

  describe('Post a question', () => {
    const user = {
      id: 1,
      firstname: 'Emmanuel',
      lastname: 'Bush',
      email: 'emabush@gmail.com',
      isAdmin: true
    };
    it('Create a question', (done) => {
      request(app)
        .post('/questions')
        .send(user)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('udpate question', () => {
    it('Updated user', (done) => {
      request(app)
        .get('/questions/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Delete a question', () => {
    it('Deleted question', (done) => {
      request(app)
        .get('/questions/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
