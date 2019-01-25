import pool from '../config/connection';

import validate from '../helpers/utilities';


// Models


const questionController = {

  upvoteQuestion: (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    pool.query('SELECT * FROM question WHERE id_question = $1', [questionId], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'question not found'
        });
      }
      pool.query('SELECT * FROM votes WHERE id_user = $1 AND id_question = $2', [req.user.id, questionId], (err, result) => {
        if (err) {
          throw err;
        }
        if (result.rows.length > 0) {
          return res.status(401).json({
            status: 401,
            error: 'You are not allowed to upvote twice the same question'
          });
        }
        pool.query('INSERT INTO votes (id_user, id_question, votes) VALUES ($1,$2,$3) RETURNING *',
          [req.user.id, questionId, true], (err, results) => {
            if (err) {
              return res.status(400).json({
                status: 400,
                error: error.details[0].message
              });
            }
            pool.query('SELECT COUNT (*) as upvote FROM votes WHERE votes = $1 AND id_question= $2', [true, questionId], (err, result) => {
              if (err) {
                throw err;
              }
              res.status(200).json({
                status: 200,
                data: result.rows
              });
            });
          });
      });
    });
  },
  downvoteQuestion: (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    pool.query('SELECT * FROM question WHERE id_question = $1', [questionId], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'question not found'
        });
      }
      pool.query('SELECT * FROM votes WHERE id_user = $1 AND id_question= $2', [req.user.id, questionId], (err, result) => {
        if (err) {
          throw err;
        }
        if (result.rows.length > 0) {
          return res.status(401).json({
            status: 401,
            error: 'You are not allowed to donwvote twice the same question'
          });
        }
        pool.query('INSERT INTO votes (id_user, id_question, votes) VALUES ($1,$2,$3) RETURNING *',
          [req.user.id, questionId, false], (err, results) => {
            if (err) {
              return res.status(400).json({
                status: 400,
                error: error.details[0].message
              });
            }

            pool.query('SELECT COUNT (*) as downvote FROM votes WHERE votes = $1 AND id_question= $2', [false, questionId], (err, result) => {
              if (err) {
                throw err;
              }
              res.status(200).json({
                status: 200,
                data: result.rows
              });
            });
          });
      });
    });
  },

  // will add an endpoint to add comment to a specific question

  createComment: (req, res) => {
    const { comment } = req.body;
    const questionId = parseInt(req.params.id, 10);


    pool.query('SELECT * FROM question WHERE id_question = $1', [questionId], (err, result) => {
      if (err) {
        throw err;
      } else if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'question not found'
        });
      } else {
        pool.query('INSERT INTO comment (id_user, id_question, comment) VALUES ($1,$2,$3) RETURNING *',
          [req.user.id, questionId, comment], (error, results) => {
            if (error) {
              return res.status(400).json({
                status: 400,
                error
              });
            }
            res.status(201).json({
              status: 201,
              data: results.rows
            });
          });
      }
    });
  },
  getAllComment: (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    pool.query('SELECT * FROM comment WHERE id_question = $1', [questionId], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Actually no comment to that question'
        });
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  }

};

export default questionController;
