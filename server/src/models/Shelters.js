const mongoose = require("mongoose");

const schema = mongoose.Schema({
  city: String,
  region: String,
  address: String,
  size: Number,
  capacity: Number,
  resources: [],
  doctors: [],
  risk: Number,
});

module.exports = mongoose.model("Shelters", schema);
