const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Adding Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({ title, imageUrl, price, description });
  product.save();
  res.redirect("/");
};

const getAdminProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
};
