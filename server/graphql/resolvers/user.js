const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  login: async () => {
    // Return a jwt given the following static user data
    const userId = 1;
    const email = "test@test.com";

    const token = jwt.sign({ userId, email }, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });

    return { userId, token, tokenExpiration: 1, email };
  },
  createAccount: async ({ email, displayName, password, confirmPassword }) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      } else {
        const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(emailRegex)) {
          throw new Error("The email entered is not a valid format");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new Error("That email is already signed up!");
        }

        displayName = displayName.trim();

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
          email,
          displayName,
          password: hashedPassword,
        });

        const newUser = await user.save();

        const token = jwt.sign(
          { userId: newUser.id, email },
          process.env.AUTH_SECRET,
          { expiresIn: "1h" }
        );

        return {
          userId: newUser.id,
          token,
          tokenExpiration: 1,
          email,
          displayName,
        };
      }
    } catch (err) {
      throw err;
    }
  },
};
