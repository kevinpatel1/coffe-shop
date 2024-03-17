const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyToken } = require("../utils/auth");

router.post("/store", verifyToken, categoryController.categoryAdd);

router.put("/update/:id", verifyToken, categoryController.categoryUpdate);

router.get("/list", categoryController.categoryGetAll);

router.get("/filter/:size/:page", categoryController.categoryGetAllFilter);

router.get("/list/:id/:size/:page", categoryController.categoryGetById);
router.delete("/delete/:id", verifyToken, categoryController.categoryDelete);

module.exports = router;
