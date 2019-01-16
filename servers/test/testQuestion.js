/* eslint-disable consistent-return */
/* eslint-disable no-undef */
// eslint-disable-next-line
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app');

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
      error: 'the question with the given Id was not found'
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
    const question = {
      id: 1,
      user: 1,
      meetup: 2,
      title: 'Algrorithm complexity',
      body: 'How to set the order of functions?'
    };
    it('Create a question', (done) => {
      request(app)
        .post('/questions')
        .send(question)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Upvote an existing question', () => {
    it('Updated user', (done) => {
      request(app)
        .patch('/questions/1/upvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Upvote a non existing question', () => {
    const error = {
      status: 404,
      error: 'the question with the given Id was not found'
    };
    it('the question with the given id was not found', (done) => {
      request(app)
        .patch('/questions/30/upvote')
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
    it('Updated user', (done) => {
      request(app)
        .patch('/questions/1/downvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Downvote a non existing question', () => {
    const error = {
      status: 404,
      error: 'the question with the given Id was not found'
    };
    it('the question with the given id was not found', (done) => {
      request(app)
        .patch('/questions/30/downvote')
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

  describe('Delete an existing question', () => {
    it('Deleted question', (done) => {
      request(app)
        .delete('/questions/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
describe('Specific question not found', () => {
  const error = {
    status: 404,
    error: 'the question with the given Id was not found'
  };
  it('Given question Id not found', (done) => {
    request(app)
      .delete('/questions/30')
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
