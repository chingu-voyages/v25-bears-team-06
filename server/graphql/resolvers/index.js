const userResolver = require("./user");
const bookResolver = require("./book");

const rootResolver = {
  ...userResolver,
  ...bookResolver,
};

module.exports = rootResolver;
