const Book = require("../../models/book");
const User = require("../../models/user");
const Ownership = require("../../models/ownership");
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
      if (req.error) {
        throw new Error(req.error);
      }
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
        throw new Error("Could not find a user with the requester's userId");
      }

      const ownership = new Ownership({
        owner,
        book,
        isAvailable: true,
      });

      owner.owns.push(ownership);
      book.owners.push(ownership);

      await ownership.save();
      await owner.save();
      await book.save();

      return transformBook(book);
    } catch (err) {
      throw err;
    }
  },
};
