// module.exports = require("./category");
// module.exports = require("./role");
// module.exports = require("./server");
// module.exports = require("./user");

const Category = require("./category");
const Role = require("./role");
const Server = require("./server");
const User = require("./user");

module.exports = {
  Category,
  Role,
  Server,
  User,
};
