const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { transformUser } = require("./merge");

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

    const token = jwt.sign(
      { userId: user._id, email },
      process.env.AUTH_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {
      token,
      tokenExpiration: 1,
      userId: user._id,
      email,
      displayName: user.displayName,
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
  getUser: async (args, req) => {
    if (!req.isAuth) {
      if (req.error) {
        throw new Error(req.error);
      }
      throw new Error("Authentication required!");
    }

    try {
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("Cannot find a user with hte requester's userId");
      }

      return transformUser(user);
    } catch (err) {
      throw err;
    }
  },
};
