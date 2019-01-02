const express = require('express');

const router = express.Router();

const users = [
  {
    id: 1,
    firstname: 'Emmanuel',
    lastname: 'Bush',
    othername: 'King',
    email: 'emabush@gmail',
    phoneNumber: '+243978318021',
    username: 'EmmaBush',
    registered: '2018-12-23',
    isAdmin: true
  },
  {
    id: 2,
    firstname: 'Gaëtan',
    lastname: 'Aruha',
    othername: 'Junior',
    email: 'gaetan@gmail',
    phoneNumber: '+243978318021',
    username: 'GaëtanArh',
    registered: '2018-12-23',
    isAdmin: false
  },
  {
    id: 3,
    firstname: 'Clara',
    lastname: 'Bush',
    othername: 'Queen',
    email: 'queenclara@gmail',
    phoneNumber: '+243978318021',
    username: 'QueenCla',
    registered: '2018-12-23',
    isAdmin: false
  }];

module.exports = router;
