const Cart = require("./cart");

const db = require("../utils/database");

class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static async fetchAll() {
    try {
      const [products] = await db.execute("SELECT * FROM products");
      return products;
    } catch (e) {
      console.log("ERROR fetching from db in fetchAll", e);
      return [];
    }
  }

  static async findById(id) {
    try {
      const [productRow] = await db.execute(
        "SELECT * FROM products WHERE products.id = ?",
        [id]
      );
      return productRow[0];
    } catch (e) {
      console.log("ERROR fetching from db in findById", e);
    }
  }

  async save() {
    try {
      return db.execute(
        "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
        [this.title, this.price, this.imageUrl, this.description]
      );
    } catch (e) {
      console.log("ERROR saving to db in save", e);
    }
  }
}

module.exports = Product;
