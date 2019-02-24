import jwt from 'jsonwebtoken';
import keys from '../config/keys';


// const jwt = require('jsonwebtoken');

const userAuthentication = {

  verifyToken: (req, res, next) => {
    // get auth header value
    const token = req.headers.authorization || req.body.token;

    if (!token) {
      return res.status(401).send({
        message: 'Please input a token'
      });
    }

    jwt.verify(token, keys.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: 'Authentication failed. Please input a valid token.'
        });
      }
      req.user = decoded;
      next();
    });
  },

  verifyAdmin: (req, res, next) => {
    if (req.user && req.user.email === 'emabush@gmail.com') {
      return next();
    }
    return res.status(403).send({
      message: 'Route can only be assessed by the admin'
    });
  }
};

export default userAuthentication;
