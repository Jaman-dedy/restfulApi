import jwt from 'jsonwebtoken';

import dateTime from 'date-time';
import bcrypt from 'bcryptjs';
import keys from '../config/keys';
import pool from '../config/connection';

import validate from '../helpers/utilities';


const current = dateTime();
const userController = {


  login: (req, res) => {
    const { email, password } = req.body;
    const validateLogin = validate.loginValidate;
    const { error } = validateLogin(req.body);
    if (error) {
      const errorMessage = error.details.map(d => d.message);
      return res.status(400).send({
        status: 400,
        error: errorMessage
      });
    }

    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
      if (err) {
        throw err;
      }
      if (!bcrypt.compareSync(password, result.rows[0].password)) {
        return res.status(400).json({
          status: 400,
          error: 'Bad password, please try again'
        });
      }
      const userlog = {
        username: result.rows[0].username,
        email: result.rows[0].email,
        id: result.rows[0].id_user
      };

      jwt.sign(userlog, keys.secret, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          throw err;
        }
        const user = {
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
          othername: result.rows[0].othername,
          email: result.rows[0].email,
          username: result.rows[0].username
        };
        res.status(200).json({
          status: 200,
          user: user,
          token
        });
      });
    });
  },
  createUser: (req, res) => {
    const {
      firstname, lastname, othername, email, phonenumber, username, password
    } = req.body;

    const validateUser = validate.userValidate;
    const { error } = validateUser(req.body);
    if (error) {
      const errorMessage = error.details.map(d => d.message);
      return res.status(400).send({
        status: 400,
        error: errorMessage
      });
    }
    const hash = bcrypt.hashSync(password);

    const payload = {
      email: req.body.email,
      username: req.body.username

    };
    jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      } else {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
          if (err) {
            throw err;
          }
          if (result.rows.length > 0) {
            return res.status(400).json({
              status: 400,
              error: 'Email address already used, choose another'
            });
          }
          pool.query('INSERT INTO users (firstname, lastname, othername, email, phonenumber, username, password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
            [firstname, lastname, othername, email, phonenumber, username, hash], (err, result) => {
              if (err) {
                throw err;
              } else {
                const user = {
                  firstname: result.rows[0].firstname,
                  lastname: result.rows[0].lastname,
                  othername: result.rows[0].othername,
                  email: result.rows[0].email,
                  username: result.rows[0].username
                };
                res.status(201).json({
                  status: 201,
                  data: user,
                  token
                });
              }
            });
        });
      }
    });
  },

  getAllUser: (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  },
  getOneUser: (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    pool.query('SELECT * FROM users WHERE id_user = $1', [userId], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'user not found'
        });
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  },
  updateUser: (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    const {
      firstname, lastname, othername, email, phonenumber, username
    } = req.body;
    const dateUpdate = dateTime();
   const isadmin = false;
    pool.query(
      'UPDATE users SET firstname = $1, lastname = $2, othername = $3,email = $4, phonenumber= $5, username= $6, registered= $7, isadmin= $8 WHERE id_user = $9',
      [firstname, lastname, othername, email, phonenumber, username, dateUpdate, isadmin, userId],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'user not found'
          });
        }
        res.status(200).json({
          status: 200,
          data: [req.body]
        });
      }
    );
  },
  deleteUser: (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    pool.query('DELETE FROM users WHERE id_user = $1', [userId], (err, results) => {
      if (err) {
        throw err;
      }

      res.status(200).json({
        status: 200,
        data: `User deleted with ID: ${userId}`
      });
    });
  },
  getUsername: (req, res) => {
    const username = req.params.username;
    pool.query('SELECT * FROM users WHERE username=$1', [username])
      .then((users) => {
        if (users.rows.length === 0) {
          return res.status(404).json({ error: 'user not found' });
        }
        return res.json({ users: users.rows });
      })
      .catch((error) => {
        console.log(error);
      });
  }

};

export default userController;
