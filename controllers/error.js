const get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    message: "Page Not Found!",
    path: "",
  });
};

module.exports = {
  get404,
};
