const DataLoader = require("dataloader");

const User = require("../../models/user");
const Book = require("../../models/book");
const Ownership = require("../../models/ownership");

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const bookLoader = new DataLoader((bookIds) => {
  return Book.find({ _id: { $in: bookIds } });
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
      password: null,
      owners: () => ownershipLoader.loadMany(book._doc.owners),
    };
  } catch (err) {
    throw err;
  }
};

const owners = async (ownerIds) => {
  try {
    const owners = await Ownership.find({ _id: { $in: ownerIds } });
    owners.sort((a, b) => {
      return (
        ownerIds.indexOf(a._id.toString()) - ownerIds.indexOf(b._id.toString())
      );
    });
    return owners.map(transformOwner);
  } catch (err) {
    throw err;
  }
};

const transformOwner = (owner) => {
  return {
    ...owner._doc,
    owner: user.bind(this, owner._doc.owner),
    book: book.bind(this, owner._doc.book),
  };
};

const transformBook = (book) => {
  return {
    ...book._doc,
    owners: () => ownershipLoader.loadMany(book._doc.owners),
  };
};

exports.transformBook = transformBook;
