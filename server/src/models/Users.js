const mongoose = require("mongoose");

const schema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  city: String,
  region: String,
  pass: String,
});

module.exports = mongoose.model("Users", schema);
