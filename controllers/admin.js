const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Adding Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = async (req, res) => {
  try {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, price, description, imageUrl);
    const result = await product.save();
    console.log("Added the product! -> ", result);
    res.redirect("/");
  } catch (e) {
    console.log("ERROR -> Cannot execute postAddProduct", e);
  }
};

const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (e) {
    console.log("ERROR -> Cannot execute getAdminProducts", e);
  }
};

const getEditProduct = async (req, res, next) => {
  try {
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
  } catch (e) {
    console.error("ERROR -> Couldn't execute getEditProduct", e);
  }
};

const postEditProduct = async (req, res, next) => {
  try {
    const { id, title, imageUrl, price, description } = req.body;
    const product = new Product(title, price, description, imageUrl, id);
    await product.save();
    console.log("Product updated successfully!");
    return res.redirect("/admin/products");
  } catch (e) {
    console.log("ERROR -> Couldn't edit the product!", e);
  }
};

const postDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await Product.deleteById(id);
    console.log("Deleted product! -> ", result);
    return res.redirect("/admin/products");
  } catch (e) {
    console.log("ERROR -> Couldn't delete the product!", e);
  }
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
