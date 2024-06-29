const express = require("express");

const {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  postCart,
  getCheckout,
  getOrders,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);
router.get("/products/:productId", getProduct);
router.get("/products", getProducts);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.get("/checkout", getCheckout);
router.get("/orders", getOrders);

module.exports = router;
