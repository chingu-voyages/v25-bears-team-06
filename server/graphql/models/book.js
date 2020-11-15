const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  imgThumbnail: {
    type: String,
    required: false,
  },
  imgLarge: {
    type: String,
    required: false,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  publishedDate: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  ownedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
