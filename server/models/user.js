const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  owns: {
    type: [Schema.Types.ObjectId],
    ref: "Ownership",
    validate: (v) => Array.isArray(v),
    required: false,
  },
  checkedOut: {
    type: [Schema.Types.ObjectId],
    ref: "Ownership",
    validate: (v) => Array.isArray(v),
    required: false,
  },
  waitlisted: {
    type: [Schema.Types.ObjectId],
    ref: "Ownership",
    validate: (v) => Array.isArray(v),
    required: false,
  },
  location: {
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
