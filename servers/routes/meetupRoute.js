const express= require("express");
const router = express.Router();

//controller

meetupControl = require("../controllers/meetupController");
const auth=require("../controllers/userController");
const role=require("../middleware/role");
// user endpoints
router.post("/",auth.verifyToken,role.role, meetupControl.createMeetup);
router.post("/:meetupId/rsvps",auth.verifyToken,meetupControl.createMeetupRsvp);
router.get("/", auth.verifyToken,meetupControl.getAllMeetup);
router.get("/upcoming", auth.verifyToken, meetupControl.getUpcoming);
router.get("/:meetupId", auth.verifyToken, meetupControl.getOneMeetup);
router.put("/:meetupId", auth.verifyToken, role.role, meetupControl.updateMeetup);
router.delete("/:meetupId", auth.verifyToken, role.role, meetupControl.deleteMeetup);


module.exports = router;