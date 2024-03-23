const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { verifyToken } = require("../utils/auth");

router.post("/paymentOrder", verifyToken, paymentController.paymentOrder);
router.post("/paymentVerify", verifyToken, paymentController.verifyOrder);
module.exports = router;
