const Product = require("../models/product");

const getIndex = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Home",
    path: "/",
  });
};

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "Products",
    path: "/products",
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

module.exports = {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrders,
};
