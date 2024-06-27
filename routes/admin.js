const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Adding Product",
    path: "/admin/add-product",
  });
});

router.post("/add-product", (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = {
  router,
  products,
};
