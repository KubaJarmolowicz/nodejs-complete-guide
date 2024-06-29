const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static async fetchAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, (err, fileContent) => {
        if (err) {
          resolve([]);
        }

        resolve(JSON.parse(fileContent));
      });
    });
  }

  static async findById(id) {
    const products = await Product.fetchAll();
    return products.find((p) => p.id === id);
  }

  async save() {
    const products = await Product.fetchAll();

    if (this.id) {
      const existingProductIndex = products.findIndex(
        (prod) => prod.id === this.id
      );
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;
      fs.writeFile(p, JSON.stringify(updatedProducts), (e) => {
        console.log(e);
      });
    } else {
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (e) => {
        console.log(e);
      });
    }
  }
}

module.exports = Product;
