const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice += parseFloat(price);
      fs.writeFile(p, JSON.stringify(cart), (e) => {
        console.log(e);
      });
    });
  }
}

module.exports = Cart;
