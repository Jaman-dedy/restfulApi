const express= require("express");
const router = express.Router();

//controller

userControl = require("../controllers/questionController");

// user endpoints
router.post("/",userControl.createQuestion);
router.get("/", userControl.getAllQuestion);
router.get("/:id", userControl.getOneQuestion);
router.put("/:id", userControl.updateQuestion);
router.patch("/:id/upvote", userControl.upvoteQuestion );
router.patch("/:id/downvote", userControl.downvoteQuestion);

//router.delete("/:id", userControl.deleteQuestion);

module.exports = router;