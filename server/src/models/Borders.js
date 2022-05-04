const mongoose = require("mongoose");

const schema = mongoose.Schema({
  city: String,
  region: String,
  address: String,
  size: Number,
  capacity: Number,
  risk: Number,
});

module.exports = mongoose.model("Borders", schema);
