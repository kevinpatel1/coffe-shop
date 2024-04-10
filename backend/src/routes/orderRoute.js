const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../utils/auth");
router.get("/list", verifyToken, orderController.orderGetAll);
module.exports = router;
