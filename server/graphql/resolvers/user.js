const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  login: async ({ email, password }) => {
    email = email.toLowerCase();

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("The email or password entered is incorrect");
    }

    // Check if password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("The email or password entered is incorrect");
    }

    const { _id, displayName } = user;

    const token = jwt.sign(
      { userId: _id, email, displayName },
      process.env.AUTH_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {
      token,
      tokenExpiration: 1,
      userId: _id,
      email,
      displayName,
    };
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
          { userId: newUser.id, email, displayName },
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
