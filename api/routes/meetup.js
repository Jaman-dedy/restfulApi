const express = require('express');

const router = express.Router();
const dateTime = require('date-time');

const meetups = [
  {
    id: 1,
    createdOn: '2018/12/25',
    location: 'telecom house',
    images: 'upload/images/img.png',
    topic: 'why javascript is the most use langage?',
    happeningOn: '2018-12-30',
    Tags: 'Javascripts librairies, github statistics',
  },
  {
    id: 2,
    createdOn: '2018/12/23',
    location: 'telecom house',
    images: 'upload/images/img.png',
    topic: 'Machine learnings',
    happeningOn: '2018-12-29',
    Tags: 'Artificial intelligence (AI)',
  },
  {
    id: 3,
    createdOn: '2018/12/24',
    location: 'IPRC Kichukiro',
    images: 'upload/images/img.png',
    topic: 'Big-O notation',
    happeningOn: '2018-12-27',
    Tags: '# Paul Bachmann, #Edmund Landau',
  },

];

router.get('/', (req, res, next) => {

  res.status(201).json({
    status: 201,
    data: meetups,
  });
});


router.get('/upcoming', (req, res, next) => {

  const current = dateTime();
  const upcoming = [];

  // eslint-disable-next-line 
  for (let i = 0; c = meetups.length, i < c; i++) {

    if (current < meetups[i].happeningOn) {
      upcoming.push(meetups[i]);
    }

  }
  res.status(200).json({
    status: 200,

    data: upcoming,
  });


});

router.post('/', (req, res, next) => {

  const meetup = {
    id: meetups.length + 1,
    topic: req.body.topic,
    location: req.body.location,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,

  };

  if (!req.body.topic || !req.body.location)
  {
    res.status(400).json({
      status: 400,
      error: 'Topic and location are required',
    });
  }
  else {
    meetups.push(meetup);
    res.status(201).json({
      status: 201,
      data: [meetup],
    });
  }


});

router.post('/:meetupId/rsvps', (req, res, next) => {

  const meet = meetups.find(c => c.id === parseInt(req.params.meetupId));
  if (!meet)
  {
    res.status(404).json({
      status: 404,
      error: 'the meetup with the given Id was not found',
    });
  }

  else if (!req.body.meetup || !req.body.topic)
  {
    res.status(400).json({
      status: 400,
      error: 'Topic and Meetup are required',
    });

  }
  else {
    const meetup = {
      // id: meetups.length +1,
      meetup: req.body.meetup,
      topic: req.body.topic,
      status: req.body.status,

    };
    meetups.push(meetup);
    res.status(200).json({
      status: 200,
      data: [meetup],
    });
  }

});

router.get('/:meetupId', (req, res, next) => {

  const meetup = meetups.find(c => c.id === parseInt(req.params.meetupId));
  if (!meetup)
  {
    res.status(404).json({
      status: 404,
      error: 'the meetup with the given Id was not found',
    });
  }
  else {
    res.status(200).json({
      status: 200,
      data: [meetup],
    });
  }

});

router.put('/:meetupId', (req, res, next) => {
  const meetup = meetups.find(c => c.id === parseInt(req.params.meetupId));
  if (!meetup) res.status(404).send('the meetup with the given Id was not found');

  if (!req.body.topic || req.body.location)
  {
    res.status(400).send('Topic and location are required');
    return;
  }
  meetup.topic = req.body.topic;
  meetup.location = req.body.location;
  meetup.happeningOn = req.body.happeningOn;
  meetup.Tags = req.body.Tags;
  res.send(meetup);

});


router.delete('/:meetupId', (req, res, next) => {
  const meetup = meetups.find(c => c.id === parseInt(req.params.meetupId));
  if (!meetup) res.status(404).send('the meetup with the given Id was not found');

  const index = meetups.indexOf(meetup);
  meetups.splice(index, 1);

  res.send(meetup);
});
module.exports = router;
