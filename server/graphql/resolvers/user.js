const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: () => {
    // Return a jwt given the following static user data
    const userId = 1;
    const email = "test@test.com";

    const token = jwt.sign({ userId, email }, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });

    return { userId, token, tokenExpiration: 1, email };
  },
};
