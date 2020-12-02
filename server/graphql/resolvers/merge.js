const DataLoader = require("dataloader");

const User = require("../../models/user");
const Book = require("../../models/book");
const Ownership = require("../../models/ownership");

const userLoader = new DataLoader((userIds) => {
  // Sort batched data returned by mongo in order of IDs passed to function
  return User.find({ _id: { $in: userIds } }).then((result) =>
    result.sort((a, b) => {
      return (
        userIds.indexOf(a._id.toString()) - userIds.indexOf(b._id.toString())
      );
    })
  );
});

const bookLoader = new DataLoader((bookIds) => {
  // Sort batched data returned by mongo in order of IDs passed to function
  return Book.find({ _id: { $in: bookIds } }).then((result) =>
    result.sort((a, b) => {
      return (
        bookIds.indexOf(a._id.toString()) - bookIds.indexOf(b._id.toString())
      );
    })
  );
});

const ownershipLoader = new DataLoader((ownerIds) => {
  return owners(ownerIds);
});

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());

    return {
      ...user._doc,
      password: null,
      owns: () => ownershipLoader.loadMany(user._doc.owns),
    };
  } catch (err) {
    throw err;
  }
};

const book = async (bookId) => {
  try {
    const book = await bookLoader.load(bookId.toString());
    return {
      ...book._doc,
      owners: () => ownershipLoader.loadMany(book._doc.owners),
    };
  } catch (err) {
    throw err;
  }
};

const owners = async (ownerIds) => {
  try {
    const owners = await Ownership.find({ _id: { $in: ownerIds } });

    // Sort batched data returned by mongo in order of IDs passed to function
    const ownerIdStrings = ownerIds.map((ownerId) => ownerId.toString());
    owners.sort((a, b) => {
      return (
        ownerIdStrings.indexOf(a._id.toString()) -
        ownerIdStrings.indexOf(b._id.toString())
      );
    });

    return owners.map(transformOwner);
  } catch (err) {
    throw err;
  }
};

const transformOwner = (ownership) => {
  return {
    ...ownership._doc,
    owner: () => user(ownership._doc.owner),
    book: book.bind(this, ownership._doc.book),
    checkoutData: () =>
      ownership.checkoutData.map((checkout) => {
        return {
          ...checkout._doc,
          user: () => user(checkout.user),
        };
      }),
  };
};

const transformBook = (book) => {
  return {
    ...book._doc,
    owners: () => ownershipLoader.loadMany(book.owners),
  };
};

exports.transformBook = transformBook;
exports.transformOwner = transformOwner;
