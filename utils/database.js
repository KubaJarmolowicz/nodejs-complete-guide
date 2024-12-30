const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://kubajarmolowicz92:XLnH2OcpZrlmjrQq@cluster0.ugwsp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      cb();
    })
    .catch((e) => {
      console.error("Connection to MongoDB failed! -> ", e);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

module.exports = { mongoConnect, getDb };
