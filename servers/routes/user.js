const express = require('express');

const router = express.Router();

userControl = require("../controllers/userController")

const users = [
 
  
 ];
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    data: users
  });
});

router.post('/', (req, res, next) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email) {
    res.status(404).json({
      status: 404,
      error: 'Fields are required'
    });
  } else {
    const user = {

      id: users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      isAdmin: req.body.isAdmin
    };
    users.push(user);

    res.status(201).json({
      status: 201,
      data: [user]
    });
  }
});

router.get('/:userId', (req, res, next) => {
  const user = users.find(c => c.id === parseInt(req.params.userId, 10));
  if (!user) {
    res.status(404).json({
      status: 404,
      error: 'user with the given Id not exists'
    });
  } else {
    res.status(200).json({
      status: 200,
      data: [user]
    });
  }
});

router.patch('/:userId', (req, res, next) => {
  res.status(200).json({
    message: 'udated user'
  });
});
router.delete('/:userId', (req, res, next) => {
  res.status(200).json({
    message: 'deleted user'
  });
});
module.exports = router;
