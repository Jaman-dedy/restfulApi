/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../app');

describe('Testing user endpoints', () => {
  describe('All users', () => {
    it('All users', (done) => {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('Find a specific user', () => {
    it('Get a specific user', (done) => {
      request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Specific user not found', () => {
    const error = {
      status: 404,
      error: 'user with the given Id not exists'
    };
    it('Given user Id not found', (done) => {
      request(app)
        .get('/users/30')
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

  describe('Post user', () => {
    const user = {
      id: 1,
      firstname: 'Emmanuel',
      lastname: 'Bush',
      email: 'emabush@gmail.com',
      isAdmin: true
    };
    it('Create a user', (done) => {
      request(app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('udpate user', () => {
    it('Updated user', (done) => {
      request(app)
        .patch('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Delete user', () => {
    it('Deleted user', (done) => {
      request(app)
        .delete('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
