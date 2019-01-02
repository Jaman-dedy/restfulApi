const express = require('express');

const router = express.Router();

const questions = [
  {
    id: 1,
    createdOn: '2018-12-30',
    createdBy: 1,
    meetup: 1,
    title: 'JS standardization',
    body: 'Why js syntaxes differ from a version to antoher?',
    votes: 0
  },
  {
    id: 2,
    createdOn: '2018-12-26',
    createdBy: 2,
    meetup: 2,
    title: 'Algrorithm complexity',
    body: 'How to set the order of functions?',
    votes: 0
  },
  {
    id: 3,
    createdOn: '2018-12-27',
    createdBy: 3,
    meetup: 3,
    title: 'Expert system',
    body: 'What expert system consists on?',
    votes: 0
  }
];


module.exports = router;
