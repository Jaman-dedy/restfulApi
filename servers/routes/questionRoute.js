import express from 'express';
import questionControl from '../controllers/questionController';
import userAuthentication from '../middleware/authentication';


const router = express.Router();


router.post('/:id/comments', userAuthentication.verifyToken, questionControl.createComment);
router.get('/:id/comments', userAuthentication.verifyToken, questionControl.getAllComment);
router.patch('/:id/upvote', userAuthentication.verifyToken, questionControl.upvoteQuestion);
router.patch('/:id/downvote', userAuthentication.verifyToken, questionControl.downvoteQuestion);



export default router;
