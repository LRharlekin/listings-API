const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("No valid token.");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload: ", payload);
    // attach the user to the req before passing on to listings route
    req.user = {
      userID: payload.userID,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid.");
  }
};

module.exports = auth;
