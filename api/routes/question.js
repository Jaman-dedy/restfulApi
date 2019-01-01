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

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    data: questions
  });
});

router.post('/', (req, res, next) => {
  const question = {

    id: questions.length + 1,
    user: req.body.user,
    meetup: req.body.meetup,
    title: req.body.title,
    body: req.body.body
  };

  if (!req.body.user || !req.body.meetup || !req.body.title || !req.body.body) {
    res.status(400).json({
      status: 400,
      error: 'All fields are required'
    });
  } else {
    questions.push(question);
    res.status(201).json({
      status: 201,
      data: [question]
    });
  }
});

router.get('/:questionId', (req, res, next) => {
  const question = questions.find(c => c.id === parseInt(req.params.questionId, 10));
  if (!question) {
    res.status(404).json({
      status: 404,
      error: 'the question with the given Id was not found'
    });
  } else {
    res.status(200).json({
      status: 200,
      data: [question]
    });
  }
});
router.patch('/:questionId/upvote', (req, res, next) => {
  const question = questions.find(c => c.id === parseInt(req.params.questionId, 10));
  if (!question) {
    res.status(404).json({
      status: 404,
      error: 'the question with the given Id was not found'
    });
  } else {
    let size = parseInt(req.params.questionId, 10);
    size -= 1;
    let upvote = questions[size].votes;
    // eslint-disable-next-line
    upvote++;
    questions[size].votes = upvote;
    res.status(200).json({
      status: 200,
      data: [question]
    });
  }
});
router.patch('/:questionId/downvote', (req, res, next) => {
  const question = questions.find(c => c.id === parseInt(req.params.questionId, 10));
  if (!question) {
    res.status(404).json({
      status: 404,
      error: 'the question with the given Id was not found'
    });
  } else {
    let size = parseInt(req.params.questionId, 10);
    size -= 1;
    let upvote = questions[size].votes;
    // eslint-disable-next-line
    upvote--;
    questions[size].votes = upvote;
    res.status(200).json({
      status: 200,
      data: [question]
    });
  }
});

router.delete('/:questionId', (req, res, next) => {
  const question = questions.find(c => c.id === parseInt(req.params.questionId, 10));
  if (!question) {
    res.status(404).json({
      status: 404,
      error: 'the question with the given Id was not found'
    });
  } else {
    const index = questions.indexOf(question);
    questions.splice(index, 1);

    res.status(200).json({
      status: 200,
      data: [question]
    });
  }
});
module.exports = router;
