const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const { get404 } = require("./controllers/error");
const { mongoConnect } = require("./utils/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  // try {
  //   const user = await User.findByPk(1);
  //   req.user = user;
  // } catch (e) {
  //   console.log("Cannot assign user to request!");
  // } finally {
  //   next();
  // }
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
});
