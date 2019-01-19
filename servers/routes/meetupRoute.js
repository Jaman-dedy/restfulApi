const express= require("express");
const router = express.Router();

//controller

meetupControl = require("../controllers/meetupController");

// user endpoints
router.post("/",meetupControl.createMeetup);
router.post("/:id/rsvps",meetupControl.createMeetupRsvp);
router.post("/:id/rsvps",meetupControl.createMeetupRsvp);
router.get("/", meetupControl.getAllMeetup);
router.get("/upcoming", meetupControl.getUpcoming);
router.get("/:id", meetupControl.getOneMeetup);
//router.put("/:id", meetupControl.updateMeetup);
//router.delete("/:id", userControl.deleteMeetup);

module.exports = router;