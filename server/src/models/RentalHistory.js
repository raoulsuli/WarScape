const mongoose = require("mongoose");

const schema = mongoose.Schema({
  type: String,
  item_id: String,
  size: Number,
  date: Date,
  user_email: String,
  active: Boolean,
});

module.exports = mongoose.model("RentalHistory", schema);
