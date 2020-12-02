const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A checkout must have a user reference"],
  },
  checkoutDate: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: false,
  },
  condition: {
    type: String,
    required: false,
  },
});

const ownershipSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  checkoutData: {
    type: [checkoutSchema],
    validate: (v) => Array.isArray(v),
    required: false,
  },
});

module.exports = mongoose.model("Ownership", ownershipSchema);
