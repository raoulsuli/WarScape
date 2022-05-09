const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  city: String,
  region: String,
  address: String,
  size: Number,
  capacity: Number,
  risk: Number,
});

module.exports = mongoose.model("Border", schema);
