const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

const INITIAL_STATE = {
  products: [],
  totalPrice: 0,
};

class Cart {
  static async getContent() {
    return new Promise((resolve, reject) => {
      return fs.readFile(p, (err, fileContent) => {
        if (err) {
          resolve(INITIAL_STATE);
        }

        resolve(JSON.parse(fileContent));
      });
    });
  }

  static addProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = INITIAL_STATE;

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
        updatedProduct = { id, qty: 1, price };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice += parseFloat(price);
      fs.writeFile(p, JSON.stringify(cart), (e) => {
        console.log(e);
      });
    });
  }

  static async deleteProduct(id) {
    const { products, totalPrice, ...rest } = await this.getContent();

    console.log({ products, totalPrice, id });

    const index = products.findIndex((prod) => prod.id === id);
    const productToDelete = products[index];

    if (!productToDelete) {
      return;
    }

    const updatedProducts = products.filter((prod) => prod.id !== id);
    const updatedPrice =
      totalPrice - parseFloat(productToDelete.price) * productToDelete.qty;

    console.log({ totalPrice, productToDelete });

    const updatedCart = {
      ...rest,
      products: updatedProducts,
      totalPrice: updatedProducts.length > 0 ? updatedPrice : 0,
    };

    fs.writeFile(p, JSON.stringify(updatedCart), (e) => {
      console.log(e);
    });
  }
}

module.exports = Cart;
