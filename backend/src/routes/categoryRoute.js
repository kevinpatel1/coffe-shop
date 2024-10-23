const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyToken } = require("../utils/auth");
const upload = require("../utils/upload");

router.post("/store",  verifyToken,
    upload.single("image"),categoryController.categoryAdd);

router.put("/update/:id", verifyToken,
    upload.single("image"), categoryController.categoryUpdate);

router.get("/list", categoryController.categoryGetAll);

router.get("/filter/:size/:page", categoryController.categoryGetAllFilter);

router.get("/list/:id/:size/:page", categoryController.categoryGetById);
router.delete("/delete/:id", verifyToken, categoryController.categoryDelete);

module.exports = router;
