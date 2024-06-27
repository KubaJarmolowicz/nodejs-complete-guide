const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("./utils/hbs");

const { router: adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", message: "Page Not Found!" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
