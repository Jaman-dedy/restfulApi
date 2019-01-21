const express= require("express");
const router = express.Router();

//controller

userControl = require("../controllers/userController");

// user endpoints
router.post("/",userControl.createUser);
router.get("/", userControl.getAllUser);
router.get("/:userId", userControl.getOneUser);
router.put("/:userId", userControl.updateUser);
router.delete("/:userId", userControl.deleteUser);
router.get("/username/:username",userControl.getUsername);

module.exports = router;
