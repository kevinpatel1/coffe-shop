const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../utils/auth");
router.get("/list", verifyToken, transactionController.transactionGetAll);
module.exports = router;
