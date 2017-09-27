// Modules
const Http = require("http");

const server = require(".");
// Listen
// Make sure datatabse connection is ready
module.exports = Http.createServer(server.callback()).listen(
  process.env.PORT || 9999
);
