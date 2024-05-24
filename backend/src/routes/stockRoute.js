const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const { verifyToken } = require("../utils/auth");

router.post("/store", verifyToken, stockController.stockAdd);

router.get("/list", verifyToken, stockController.stockGetAll);

router.get("/filter", verifyToken, stockController.stockGetAllFilter);

router.get("/list/:id/:size/:page", verifyToken, stockController.stockGetById);

module.exports = router;
