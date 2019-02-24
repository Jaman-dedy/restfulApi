import express from 'express';

import jwt from 'jsonwebtoken';

import authUser from '../middleware/authentication';

import userControl from '../controllers/userController';

const router = express.Router();

// user endpoints
router.post('/auth/signup', userControl.createUser);
router.get('/', authUser.verifyToken, userControl.getAllUser);
router.get('/:userId', authUser.verifyToken, userControl.getOneUser);
router.put('/:userId', authUser.verifyToken, userControl.updateUser);
router.delete('/:userId', userControl.deleteUser);
router.get('/username/:username', userControl.getUsername);

router.post('/auth/login', userControl.login);


export default router;
