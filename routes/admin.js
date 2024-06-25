const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  //   res.send(
  //     "<form method='post' action='/admin/add-product'><input type='text' name='title' /><button type='submit'>Add Product</button></form>"
  //   );
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
