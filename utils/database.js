const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node-complete", "root", "kijciwryj69", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
