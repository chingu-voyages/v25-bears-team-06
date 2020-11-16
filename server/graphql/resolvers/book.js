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
  //5fb2519d2602e52ff53b9dcb
  addBook: async (
    {
      bookInput: {
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

    const book = new Book({
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

    try {
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
