const Book = require("../../models/book");
const User = require("../../models/user");
const Ownership = require("../../models/ownership");
const { transformBook, transformOwner } = require("./merge");
const { renderGraphiQL } = require("express-graphql/renderGraphiQL");

module.exports = {
  checkoutBook: async ({ ownershipId, checkoutDate, dueDate }, req) => {
    if (!req.isAuth) {
      throw new Error("Authentication required!");
    }

    try {
      const ownership = await Ownership.findById(ownershipId);
      if (!ownership) {
        throw new Error("Cannot find an Ownership with the given ID");
      }

      if (!ownership.isAvailable) {
        throw new Error("Cannot checkout a book that is already checked out!");
      }

      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("Could not find a user with the requester's userId");
      }

      if (ownership.owner.equals(user._id)) {
        throw new Error("A book cannot be checked out by its owner!");
      }

      // Create new checkout subdocument
      const newCheckout = {
        user: req.userId,
        checkoutDate,
        dueDate,
      };

      // Push new checkout and update availability
      ownership.checkoutData.push(newCheckout);
      ownership.isAvailable = false;

      // Update user with new checkout
      user.checkedOut.push(ownership);

      // Save data
      const updatedOwnership = await ownership.save();
      await user.save();

      return transformOwner(updatedOwnership);
    } catch (err) {
      throw err;
    }
  },
  returnBook: async ({ ownershipId, returnDate, condition }, req) => {
    if (!req.isAuth) {
      throw new Error("Authentication required!");
    }

    try {
      const ownership = await Ownership.findById(ownershipId);
      if (!ownership) {
        throw new Error("Cannot find an Ownership with the given ID");
      }

      if (ownership.isAvailable) {
        throw new Error("Cannot return a book that isn't checked out!");
      }

      if (!ownership.owner.equals(req.userId)) {
        throw new Error("A return may only be conducted by the book's owner");
      }

      const { length } = ownership.checkoutData;

      // Update current checkout with return data
      ownership.checkoutData[length - 1].returnDate = returnDate;
      ownership.checkoutData[length - 1].condition = condition;
      ownership.isAvailable = true;

      // Update user who checked out the book
      const user = await User.findById(ownership.checkoutData[length - 1].user);

      // Find index of the checkout to delete from array
      const checkoutIndex = user.checkedOut.findIndex((checkout) =>
        checkout.equals(ownership._id)
      );
      user.checkedOut.splice(checkoutIndex, 1);

      // Save updated data and return with dataloader
      await user.save();
      const updatedOwnership = await ownership.save();

      return transformOwner(updatedOwnership);
    } catch (err) {
      throw err;
    }
  },
};
