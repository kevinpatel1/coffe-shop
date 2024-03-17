const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/userController");
const upload = require("../utils/upload");

router.post("/registerUser", employeeController.userRegister);

module.exports = router;
