const express= require("express");
const router = express.Router();

//controller

meetupControl = require("../controllers/meetupController");

// user endpoints
router.post("/",meetupControl.createMeetup);
router.post("/:id/rsvps",meetupControl.createMeetupRsvp);
router.get("/", meetupControl.getAllMeetup);
router.get("/upcoming", meetupControl.getUpcoming);
router.get("/:meetupId", meetupControl.getOneMeetup);
router.put("/:meetupId", meetupControl.updateMeetup);
router.delete("/:meetupId", meetupControl.deleteMeetup);

module.exports = router;