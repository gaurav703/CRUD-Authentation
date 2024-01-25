const express = require("express");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const SCHEMA = mongoose.Schema;

const newuserSchema = new SCHEMA({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    // lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Minimum password length is 6 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    // validate: {
    //   validator: function (el) {
    //     return el === this.password;
    //   },
    //   message: "Passwords are not the same",
    // },
  },
});

module.exports = mongoose.model("NewUser", newuserSchema);
