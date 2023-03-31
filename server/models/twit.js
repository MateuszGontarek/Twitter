const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  parents: {
    type: String,
    default: null,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Twit = mongoose.model("twits", userSchema);

module.exports = Twit;
