const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    if (id) {
      this._id = new ObjectId(`${id}`);
    }
  }

  async save() {
    try {
      const db = getDb();
      if (this._id) {
        return await db.collection("products").updateOne(
          {
            _id: this._id,
          },
          {
            $set: this,
          }
        );
      } else {
        return await db.collection("products").insertOne(this);
      }
    } catch (e) {
      console.error("ERROR saving to products collection -> ", e);
    }
  }

  static async fetchAll() {
    try {
      const db = getDb();
      return db.collection("products").find().toArray();
    } catch (e) {
      console.error("ERROR fetchAll of Products -> ", e);
    }
  }

  static async findById(prodId) {
    try {
      const db = getDb();
      return db
        .collection("products")
        .find({
          _id: new ObjectId(`${prodId}`),
        })
        .next();
    } catch (e) {
      console.error("ERROR findById of Products -> ", e);
    }
  }

  static async deleteById(prodId) {
    try {
      const db = getDb();
      return db.collection("products").deleteOne({
        _id: new ObjectId(`${prodId}`),
      });
    } catch (e) {
      console.error("ERROR deleteById of Products -> ", e);
    }
  }
}

module.exports = Product;
