const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const userSchema = new SCHEMA({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    minLength: 6,
  },
  file: {
    type: String,
    required: false,
  },
  files: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);

// User == name of the model
