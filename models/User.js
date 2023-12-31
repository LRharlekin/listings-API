const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username required. Please provide a username"],
    minglength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email address.",
    ],
    unqiue: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    minglength: 6,
  },
});

UserSchema.statics.isThisEmailUnique = async function (email) {
  try {
    const user = await this.findOne({ email });
    if (user) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("error inside isThisEmailUnique():", error.message);
    return false;
  }
};

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.checkPassword = async function (passwordCandidate) {
  // bcrypt.compare(passwordCandidate, hash)
  const isMatch = await bcrypt.compare(passwordCandidate, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
