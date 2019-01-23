const express= require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');


//controller

userControl = require("../controllers/userController");

// user endpoints
router.post("/auth/signup", userControl.verifyToken, userControl.createUser);
router.get("/", userControl.getAllUser);
router.get("/:userId", userControl.getOneUser);
router.put("/:userId", userControl.updateUser);
router.delete("/:userId", userControl.deleteUser);
router.get("/username/:username",userControl.getUsername);

router.post("/auth/login", userControl.login);



module.exports = router;
