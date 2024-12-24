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
    const product = await Product.create({
      title,
      price,
      imageUrl,
      description,
    });
    console.log("Added the product!");
    res.redirect("/");
  } catch (e) {
    console.log("ERROR -> Cannot add product", e);
  }
};

const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (e) {
    console.log("ERROR -> Cannot execute findAll", e);
  }
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  const isEdit = editMode === "true";

  if (!isEdit) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  const product = await Product.findByPk(prodId);

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

const postEditProduct = async (req, res, next) => {
  try {
    const { id, title, imageUrl, price, description } = req.body;
    const updatedProduct = await Product.update(
      {
        id,
        title,
        imageUrl,
        price,
        description,
      },
      {
        where: {
          id,
        },
      }
    );
    //updatedProduct.save();
    console.log("Product updated successfully!");
    return res.redirect("/admin/products");
  } catch (e) {
    console.log("ERROR -> Couldn't edit the product!", e);
  }
};

const postDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;
    await Product.destroy({
      where: {
        id,
      },
    });
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
