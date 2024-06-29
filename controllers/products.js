const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Adding Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
};
