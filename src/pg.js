// Modules
const Sequelize = require("sequelize");
const Config = require("config");

// Init connection
const { database, username, password, options } = Config.get("database");
const sequelize = new Sequelize(database, username, password, options);

// Load model
sequelize.import(__dirname + "/services/user/model");

if (Config.get("debug")) {
  sequelize.sync();
}
module.exports = sequelize;
