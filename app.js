const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const { get404 } = require("./controllers/error");
const db = require("./utils/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

db.execute("SELECT * FROM products")
  .then((res) => {
    console.log("db res", res);
  })
  .catch((e) => {
    console.log("Error executing a query on db: ", e);
  });

app.use(get404);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
