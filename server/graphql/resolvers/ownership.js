const Book = require("../../models/book");
const User = require("../../models/user");
const Ownership = require("../../models/ownership");
const { transformOwner } = require("./merge");

module.exports = {
  checkoutBook: async ({ ownershipId, checkoutDate, dueDate }, req) => {
    if (!req.isAuth) {
      if (req.error) {
        throw new Error(req.error);
      }
      throw new Error("Authentication required!");
    }

    try {
      const ownership = await Ownership.findById(ownershipId);
      if (!ownership) {
        throw new Error("Cannot find an Ownership with the given ID");
      }

      if (
        !ownership.isAvailable &&
        !ownership.checkoutData[ownership.checkoutData.length - 1].returnDate
      ) {
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
      if (req.error) {
        throw new Error(req.error);
      }
      throw new Error("Authentication required!");
    }

    try {
      if (!returnDate || returnDate === "") {
        throw new Error("A returnDate is required to return a book");
      }
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

      // Check if the book has already been returned
      if (ownership.checkoutData[length - 1].returnDate) {
        throw new Error("This book has already been returned!");
      }

      // Update current checkout with return data
      ownership.checkoutData[length - 1].returnDate = returnDate;
      ownership.checkoutData[length - 1].condition = condition;

      if (ownership.waitlist.length === 0) {
        ownership.isAvailable = true;
      }

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
  removeBook: async ({ ownershipId }, req) => {
    if (!req.isAuth) {
      if (req.error) {
        throw new Error(req.error);
      }
      throw new Error("Authentication required!");
    }

    try {
      const ownership = await Ownership.findById(ownershipId);
      if (!ownership) {
        throw new Error("Cannot find an Ownership with the given ID");
      }

      if (
        !ownership.isAvailable &&
        !ownership.checkoutData[ownership.checkoutData.length - 1].returnDate
      ) {
        throw new Error("Cannot remove a book that is checked out!");
      }

      if (!ownership.owner.equals(req.userId)) {
        throw new Error(
          "A book removal may only be conducted by the book's owner"
        );
      }

      // Verify book and user tied to ownership object exist before removal
      const book = await Book.findById(ownership.book);
      if (!book) {
        throw new Error("Book Remove Failed: Ownership.book is not valid");
      }

      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("Book Remove Failed: Ownership.user is not valid");
      }

      // Check if the book tied with this Ownership object has other owners
      if (book.owners.length > 1) {
        // If there are other owners,
        // delete book's reference to that specific ownership object
        const ownerIndex = book.owners.findIndex((owner) =>
          owner.equals(ownership._id)
        );
        book.owners.splice(ownerIndex, 1);
        await book.save();
      } else if (
        book.owners.length === 1 &&
        book.owners[0].equals(ownership._id)
      ) {
        // if there is only one owner of the book,
        // remove the book from db
        await book.remove();
      }

      // Delete reference to ownership object from user
      const userOwnerIndex = user.owns.findIndex((own) =>
        own.equals(ownershipId)
      );
      user.owns.splice(userOwnerIndex, 1);
      await user.save();

      // If this ownership object has a waitlist,
      // update user.waitlisted references to this ownership
      if (ownership.waitlist.length > 0) {
        ownership.waitlist.forEach(async (waitlistedUser) => {
          const user = await User.findById(waitlistedUser);
          const waitlistIndex = user.waitlisted.findIndex((item) =>
            item.equals(ownership._id)
          );
          if (waitlistIndex !== -1) {
            user.waitlisted.splice(waitlistIndex, 1);
            await user.save();
          }
        });
      }
      await ownership.remove();

      return true;
    } catch (err) {
      throw err;
    }
  },
  joinWaitlist: async ({ ownershipId }, req) => {
    if (!req.isAuth) {
      if (req.error) {
        throw new Error(req.error);
      }
      throw new Error("Authentication required!");
    }

    try {
      const ownership = await Ownership.findById(ownershipId);
      if (!ownership) {
        throw new Error("Cannot find an Ownership with the given ID");
      }

      if (ownership.isAvailable) {
        throw new Error("The selected book is available and not waitlisted!");
      }

      if (ownership.owner.equals(req.userId)) {
        throw new Error(
          "A book owner cannot join or leave a waitlist for their own book"
        );
      }

      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("Could not find a user with the requester's userId");
      }

      // Catch case where user attempting to join waitlist is the one who checked out the book
      const numCheckedOut = ownership.checkoutData.length;
      if (numCheckedOut >= 1) {
        if (ownership.checkoutData[numCheckedOut - 1].user.equals(req.userId)) {
          throw new Error(
            "You cannot join the waitlist for a book you have checked out!"
          );
        }
      }

      // Check if the ownership object exists in user.waitlisted
      // & check if the user object exists in ownership.waitlist
      const waitListItemIndex = user.waitlisted.findIndex((item) =>
        item.equals(ownership._id)
      );
      const waitlistedUserIndex = ownership.waitlist.findIndex((item) =>
        item.equals(user._id)
      );
      if (waitListItemIndex === -1 && waitlistedUserIndex === -1) {
        user.waitlisted.push(ownership);
        await user.save();

        ownership.waitlist.push(user);
        await ownership.save();
      } else {
        throw new Error("You are already on the waitlist");
      }

      return transformOwner(ownership);
    } catch (err) {
      throw err;
    }
  },
  leaveWaitlist: async ({ ownershipId }, req) => {
    if (!req.isAuth) {
      if (req.error) {
        throw new Error(req.error);
      }
      throw new Error("Authentication required!");
    }

    try {
      const ownership = await Ownership.findById(ownershipId);
      if (!ownership) {
        throw new Error("Cannot find an Ownership with the given ID");
      }

      if (ownership.isAvailable) {
        throw new Error("The selected book is available and not waitlisted!");
      }

      if (ownership.owner.equals(req.userId)) {
        throw new Error(
          "A book owner cannot join or leave a waitlist for their own book"
        );
      }
      // If the book isnt checked out & you are the only one on the waitlist
      // make the book available again!
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("Could not find a user with the requester's userId");
      }

      // Check if the ownership object exists in user.waitlisted
      // & check if the user object exists in ownership.waitlist
      const waitListItemIndex = user.waitlisted.findIndex((item) =>
        item.equals(ownership._id)
      );
      const waitlistedUserIndex = ownership.waitlist.findIndex((item) =>
        item.equals(user._id)
      );
      if (waitListItemIndex !== -1 && waitlistedUserIndex !== -1) {
        user.waitlisted.splice(waitListItemIndex, 1);
        await user.save();

        ownership.waitlist.splice(waitlistedUserIndex, 1);

        // If this book is in "waiting" phase where it's not checked out
        // but is unavailable because there is a waitlist,
        // Set this book to available when the waitlist becomes empty
        if (
          ownership.waitlist.length === 0 &&
          ownership.checkoutData[ownership.checkoutData.length - 1].returnDate
        ) {
          ownership.isAvailable = true;
        }

        await ownership.save();
      } else {
        throw new Error("You are not on the waitlist!");
      }

      return transformOwner(ownership);
    } catch (err) {
      throw err;
    }
  },
  // Function to fix null array data points in user/ownership
  // normalizeData: async () => {
  //   try {
  //     const users = await User.find();
  //     users.forEach(async (user, i) => {
  //       if (!user.waitlisted || user.waitlisted.length === 0) {
  //         user.waitlisted = [];
  //       }
  //       if (!user.checkedOut || user.checkedOut.length === 0) {
  //         user.checkedOut = [];
  //       }
  //       await user.save();
  //     });

  //     const ownerships = await Ownership.find();
  //     ownerships.forEach(async (ownership, i) => {
  //       if (!ownership.waitlist || ownership.waitlist.length === 0) {
  //         ownership.waitlist = [];
  //       }
  //       if (!ownership.checkoutData || ownership.checkoutData.length === 0) {
  //         ownership.checkoutData = [];
  //       }
  //       await ownership.save();
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};
