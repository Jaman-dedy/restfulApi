const express= require("express");
const router = express.Router();

//controller

userControl = require("../controllers/rsvpController");

// user endpoints
router.post("/",userControl.createRsvp);
router.get("/", userControl.getAllRsvp);
router.get("/:id", userControl.getOneRsvp);
router.put("/:id", userControl.updateRsvp);
router.delete("/:id", userControl.deleteRsvp);

module.exports = router;