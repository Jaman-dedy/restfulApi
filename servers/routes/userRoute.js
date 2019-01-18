const express= require("express");
const router = express.Router();

//controller

userControl = require("../controllers/userController");

// user endpoints
router.post("/",userControl.createUser);
router.get("/", userControl.getAllUser);
router.get("/:id", userControl.getOneUser);
router.put("/:id", userControl.updateUser);
router.delete("/:id", userControl.deleteUser);

module.exports = router;