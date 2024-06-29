const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

class Product {
  constructor(title) {
    this.title = title;
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

  async save() {
    const products = await Product.fetchAll();

    products.push(this);
    fs.writeFile(p, JSON.stringify(products), (e) => {
      console.log(e);
    });
  }
}

module.exports = Product;
