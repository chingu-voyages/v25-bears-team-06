const authResolver = require("./auth");
const bookResolver = require("./book");

const rootResolver = {
  ...authResolver,
  ...bookResolver,
};

module.exports = rootResolver;
