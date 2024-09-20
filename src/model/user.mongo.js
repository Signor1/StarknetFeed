const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  chatId: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
