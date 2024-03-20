const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../utils/auth");
const upload = require("../utils/upload");

router.post("/registerUser", userController.userRegister);
router.get("/list", verifyToken, userController.userGetAll);

module.exports = router;
