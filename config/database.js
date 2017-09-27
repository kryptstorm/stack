// Modules
const Config = require("config");
const _ = require("lodash");

const activeDb = Config.get("database");

module.exports = {
  development: _.omit(_.assign({}, activeDb, activeDb.options), ["options"]),
  test: _.omit(_.assign({}, activeDb, activeDb.options), ["options"]),
  production: _.omit(_.assign({}, activeDb, activeDb.options), ["options"])
};
