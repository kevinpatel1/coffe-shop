const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../utils/auth");
const upload = require("../utils/upload");

router.post(
  "/store",
  verifyToken,
  upload.single("image"),
  productController.productAdd
);

router.put(
  "/update/:id",
  verifyToken,
  upload.single("image"),
  productController.productUpdate
);

router.get("/list", productController.productGetAll);
router.get("/listByCategory", productController.productGetAllByCategoryId);

router.delete("/delete/:id", verifyToken, productController.productDelete);

module.exports = router;
