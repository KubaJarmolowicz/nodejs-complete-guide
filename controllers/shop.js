const Product = require("../models/product");
const Cart = require("../models/cart");

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

const getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  res.render("shop/product-detail", {
    product,
    pageTitle: product.title,
    path: "/products",
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

const postCart = async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  Cart.addProduct(product.id, product.price);
  res.redirect("/");
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
  getProduct,
  getCart,
  postCart,
  getCheckout,
  getOrders,
};
