// Modules
const Config = require("config");
const _ = require("lodash");

// Table name
const TABLE_NAME = "user";
// Schema options
const schemaOptions = _.assign({}, Config.get("database.schemaOptions"), {
  tableName: `${Config.get("database.schemaOptions.tableName")}_${TABLE_NAME}`
});

exports = module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    TABLE_NAME,
    {
      username: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      passowrd: { type: DataTypes.STRING(255), allowNull: false },
      status: { type: DataTypes.INTEGER },
      first_name: { type: DataTypes.STRING(80) },
      last_name: { type: DataTypes.STRING(80) }
    },
    schemaOptions
  );
  return Model;
};

exports.STATUS_NEW = 0;
exports.STATUS_ACTIVE = 1;
exports.STATUS_LOCKED = 2;
