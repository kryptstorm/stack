const Faker = require("faker");
const _ = require("lodash");
const Bcrypt = require("bcrypt");

const limit = 255;
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("stack_user", generateFakeUsers(limit)),

  down: (queryInterface, Sequelize) => queryInterface.dropTable("stack_user")
};

const generateFakeUsers = (limit = 255) => {
  let emails = [],
    usernames = [],
    users = [];

  for (let i = 0; i < limit; i++) {
    const email = _.toLower(Faker.internet.email());
    const username = _.toLower(Faker.internet.userName());
    if (emails.indexOf(email) > -1 || usernames.indexOf(username) > -1) {
      --i;
      continue;
    }

    users.push({
      username,
      email,
      passowrd: Bcrypt.hashSync("12345", 12),
      status: Math.floor(Math.random() * 3),
      first_name: Faker.name.firstName(),
      last_name: Faker.name.lastName(),
      created_at: Faker.date.past(),
      updated_at: Faker.date.recent()
    });
  }

  return users;
};
