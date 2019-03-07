import dateTime from 'date-time';
import validate from '../helpers/utilities';


import pool from '../config/connection';

const meetupController = {
  createMeetup: (req, res) => {
    const {
      location, images, topic, happeningon, tags
    } = req.body;

    const validateMeetup = validate.meetupValidate;
    const { error } = validateMeetup(req.body);
    if (error) {
      const errorMessage = error.details.map(d => d.message);
      return res.status(400).send({
        status: 400,
        error: errorMessage
      });
    }

    pool.query('INSERT INTO meetup (location, images, topic, happeningon, tags) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [location, images, topic, happeningon, tags], (err, results) => {
        // eslint-disable-next-line prefer-destructuring
        const meetupValidate = validate.meetupValidate;
        const { error } = meetupValidate(req.body);
        if (err) {
          throw err;
        } else if (error) {
          return res.status(400).json({
            status: 400,
            error: error.details[0].message
          });
        } else {
          res.status(201).json({
            status: 201,
            data: results.rows
          });
        }
      });
  },

  createMeetupRsvp: (req, res) => {
    const { response } = req.body;
    const meetupId = parseInt(req.params.meetupId, 10);

    const validateRsvp = validate.rsvpValidate;
    const { error } = validateRsvp(req.body);
    if (error) {
      const errorMessage = error.details.map(d => d.message);
      return res.status(400).send({
        status: 400,
        error: errorMessage
      });
    }
    pool.query('SELECT * FROM meetup WHERE id_meetup = $1', [meetupId], (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'meetup not found'
        });
      } else {
        pool.query('INSERT INTO rsvp (id_meetup, id_user, response) VALUES ($1,$2,$3) RETURNING *',
          [meetupId, req.user.id, response], (err, results) => {
            if (error) {
             throw error;
            }
            res.status(201).json({
              status: 201,
              data: results.rows
            });
          });
      }
    });
  },
  createMeetupQuestion: (req, res) => {
    const { title, body } = req.body;
    const meetupId = parseInt(req.params.meetupId, 10);

    const validateQuestion = validate.questionValidate;
    const { error } = validateQuestion(req.body);
    if (error) {
      const errorMessage = error.details.map(d => d.message);
      return res.status(400).send({
        status: 400,
        error: errorMessage
      });
    }
    pool.query('SELECT * FROM meetup WHERE id_meetup = $1', [meetupId], (err, result) => {
      if (err) {
        throw err;
      } else if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'meetup not found'
        });
      } else {
        pool.query('INSERT INTO question (id_user, id_meetup, title, body) VALUES ($1,$2,$3,$4) RETURNING *',
          [req.user.id, meetupId, title, body], (err, results) => {
            if (error) {
              throw error;
            }
            res.status(201).json({
              status: 201,
              data: results.rows
            });
          });
      }
    });
  },
  getAllMeetup: (req, res) => {
    pool.query('SELECT * FROM meetup', (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  },
  getAllquestion: (req, res) => {
    const meetupId = parseInt(req.params.meetupId, 10);
    pool.query('SELECT * FROM question WHERE id_meetup = $1', [meetupId], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Actually no question to that meetup'
        });
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  },
  getUpcoming: (req, res) => {
    const current = dateTime();
    pool.query('SELECT * FROM meetup WHERE happeningon > $1', [current], (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  },
  getOneMeetup: (req, res) => {
    const meetupId = parseInt(req.params.meetupId, 10);
    pool.query('SELECT * FROM meetup WHERE id_meetup = $1', [meetupId], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'meetup not found'
        });
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  },
  updateMeetup: (req, res) => {
    const meetupId = parseInt(req.params.meetupId, 10);

    const {
      location, images, topic, happeningon, tags
    } = req.body;
    const current = dateTime();

    const validateMeetup = validate.meetupValidate;
    const { error } = validateMeetup(req.body);
    if (error) {
      const errorMessage = error.details.map(d => d.message);
      return res.status(400).send({
        status: 400,
        error: errorMessage
      });
    }

    pool.query(
      'UPDATE meetup SET location = $1, images = $2, topic = $3,happeningon = $4, tags= $5 WHERE id_meetup = $6',
      [location, images, topic, happeningon, tags, meetupId],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'Meetup not found'
          });
        }
        res.status(200).json({
          status: 200,
          data: [req.body]
        });
      }
    );
  },
  deleteMeetup: (req, res) => {
    const meetupId = parseInt(req.params.meetupId, 10);

    pool.query('DELETE FROM meetup WHERE id_meetup = $1 returning *', [meetupId], (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Meetup not found'
        });
      }

      res.status(200).json({
        status: 200,
        data: `User deleted with ID: ${meetupId}`
      });
    });
  }

};

export default meetupController;
