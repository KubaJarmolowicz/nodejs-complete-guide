const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Adding Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    id: null,
    title,
    imageUrl,
    price,
    description,
  });
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

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  const isEdit = editMode === "true";

  if (!isEdit) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  const product = await Product.findById(prodId);

  if (!product) {
    return res.redirect("/");
  }

  res.render("admin/edit-product", {
    product,
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: isEdit,
  });
};

const postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product({
    id,
    title,
    imageUrl,
    price,
    description,
  });
  updatedProduct.save();
  return res.redirect("/admin/products");
};

const postDeleteProduct = async (req, res, next) => {
  const { id } = req.body;
  await Product.deleteById(id);
  return res.redirect("/admin/products");
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
