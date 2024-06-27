//const path = require("path");

const expressHbs = require("express-handlebars");
//const rootDir = require("./path");

const hbs = expressHbs.create({
  layoutsDir: "views/layouts",
  defaultLayout: "main-layout",
  extname: "hbs",
  helpers: {
    eq: (a, b) => a === b,
  },
});

module.exports = hbs;
