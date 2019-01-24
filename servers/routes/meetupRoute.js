import express from 'express';
import userAuthentication from '../middleware/authentication';
import meetupControl from '../controllers/meetupController';

const router = express.Router();

// const auth=require("../controllers/userController");
// const role=require("../middleware/role");

// Meetup endpoints
router.post('/', userAuthentication.verifyToken, userAuthentication.verifyAdmin, meetupControl.createMeetup);
router.post('/:meetupId/rsvps', userAuthentication.verifyToken, meetupControl.createMeetupRsvp);
router.post('/:meetupId/questions', userAuthentication.verifyToken, meetupControl.createMeetupQuestion);
router.get('/', userAuthentication.verifyToken, meetupControl.getAllMeetup);
router.get('/upcoming', userAuthentication.verifyToken, meetupControl.getUpcoming);
router.get('/:meetupId', userAuthentication.verifyToken, meetupControl.getOneMeetup);
router.get('/:meetupId/questions', userAuthentication.verifyToken, meetupControl.getAllquestion);
// router.put("/:meetupId", auth.verifyToken, role.role, meetupControl.updateMeetup);
router.delete('/:meetupId', userAuthentication.verifyToken, userAuthentication.verifyAdmin, meetupControl.deleteMeetup);


export default router;
