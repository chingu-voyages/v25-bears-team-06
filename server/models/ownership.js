const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model("Ownership", ownershipSchema);
