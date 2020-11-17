const DataLoader = require("dataloader");

const User = require("../../models/user");
const Book = require("../../models/book");

const bookLoader = new DataLoader((bookIds) => {
  return books(bookIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const usersLoader = new DataLoader((userIds) => {
  return users(userIds);
});

const books = async (bookIds) => {
  try {
    const books = await Book.find({ _id: { $in: bookIds } });
    books.sort((a, b) => {
      return (
        bookIds.indexOf(a._id.toString()) - bookIds.indexOf(b._id.toString())
      );
    });
    return books.map(transformBook);
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      books: () => bookLoader.loadMany(user._doc.books),
    };
  } catch (err) {
    throw err;
  }
};

const users = async (userIds) => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    users.sort((a, b) => {
      return (
        userIds.indexOf(a._id.toString()) - userIds.indexOf(b._id.toString())
      );
    });
    return users.map(transformUser);
  } catch (err) {
    throw err;
  }
};

const transformUser = (user) => {
  return {
    ...user._doc,
    books: () => bookLoader.loadMany(user._doc.books),
  };
};

const transformBook = (book) => {
  return {
    ...book._doc,
    ownedBy: () => usersLoader.loadMany(book._doc.ownedBy),
  };
};

exports.transformBook = transformBook;
exports.transformUser = transformUser;
