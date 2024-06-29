const path = require("path");

const express = require("express");

const {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  getAdminProducts,
} = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);
router.get("/products", getAdminProducts);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);

module.exports = router;
