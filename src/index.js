// Modules
const Koa = require("koa");
const _ = require("lodash");

// Midleware
const QueryFilter = require("./libs/query-filter");

// Services
const userService = require("./services/user");

// Init app
const app = new Koa();

// Database
app.context.pg = require("./pg");
// Make sure database connection is ready
app.use(async (ctx, next) => {
  await ctx.pg.authenticate();
  await next();
});

// Register midleware
app.use(QueryFilter());

// Register services
app.use(userService.routes()).use(userService.allowedMethods());

// Export app
module.exports = app;
