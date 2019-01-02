const express = require('express');

const router = express.Router();

const rsvps = [
  {
    id: 1,
    meetup: 1,
    user: 1,
    response: 'yes'
  },
  {
    id: 2,
    meetup: 2,
    user: 2,
    response: 'maybe'
  },
  {
    id: 3,
    meetup: 3,
    user: 3,
    response: 'no'
  }
];


module.exports = router;
