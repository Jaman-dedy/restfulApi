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
router.get('/username/:username', authUser.verifyToken, userControl.getUsername);
router.delete('/:userId', authUser.verifyToken, authUser.verifyAdmin, userControl.deleteUser);


router.post('/auth/login', userControl.login);


export default router;
