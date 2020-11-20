const Book = require("../../models/book");
const User = require("../../models/user");
const { transformBook } = require("./merge");

module.exports = {
  books: async ({ query }) => {
    try {
      let books = [];
      if (!query) {
        books = await Book.find();
      } else {
        books = await Book.find({ $text: { $search: query } });
      }
      return books.map(transformBook);
    } catch (err) {
      throw err;
    }
  },
  addBook: async (
    {
      bookInput: {
        googleId,
        title,
        authors,
        description,
        categories,
        imgThumbnail,
        imgLarge,
        pageCount,
        publishedDate,
        publisher,
      },
    },
    req
  ) => {
    if (!req.isAuth) {
      throw new Error("Authentication required!");
    }

    try {
      // Check if the book is already created
      let book = await Book.findOne({ googleId });
      if (!book) {
        book = new Book({
          googleId,
          title,
          authors,
          description,
          categories,
          imgThumbnail,
          imgLarge,
          pageCount,
          publishedDate,
          publisher,
        });
      }

      // first check if user who requested exists
      const owner = await User.findById(req.userId);

      if (!owner) {
        throw new Error("User not found.");
      }

      // Give ownership to book
      book.ownedBy.push(owner);

      let newBook = await book.save();

      // Add book to owner's inventory
      owner.books.push(book);

      await owner.save();

      return transformBook(newBook);
    } catch (err) {
      throw err;
    }
  },
};
