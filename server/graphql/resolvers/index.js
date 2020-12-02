const userResolver = require("./user");
const bookResolver = require("./book");
const ownershipResolver = require("./ownership");

const rootResolver = {
  ...userResolver,
  ...bookResolver,
  ...ownershipResolver,
};

module.exports = rootResolver;
