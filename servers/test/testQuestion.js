/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../index');

describe('Testing question endpoints', () => {
 
    it('All Questions', (done) => {
      request(app)
        .get('/api/v1/questions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
 
    const error = {
      status : 404,
      message : 'question not found'
    };
    it('Given question Id not found', (done) => {
      request(app)
        .get('/api/v1/questions/30')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(error)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('Get a specific question', (done) => {
      request(app)
        .get('/api/v1/questions/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
 

    const question = {
      
      user: 1,
      meetup: 2,
      title: 'Algrorithm complexity',
      body: 'How to set the order of functions?'
    };
    it('Create a question', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send(question)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  
  describe('Upvote a non existing question', () => {
    const error = {
      status : 404,
      message : 'question not found'
    };
    it('Should return the question with the given id was not found', (done) => {
      request(app)
        .patch('/api/v1/questions/30/upvote')
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

  describe('Upvote an existing question', () => {
    it('Should return Updated user', (done) => {
      request(app)
        .patch('/api/v1/questions/1/upvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Downvote a non existing question', () => {
    const error = {
      status : 404,
      message : 'question not found'
    };
    it('Sould return the question with the given id was not found', (done) => {
      request(app)
        .patch('/api/v1/questions/30/downvote')
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

  describe('Downvote an existing question', () => {
    it('Should return the Updated user', (done) => {
      request(app)
        .patch('/api/v1/questions/1/downvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
 
});
