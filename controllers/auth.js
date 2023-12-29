const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

/* 
#### Register User

- Validate (name, email, pw) using mongoose
- if not valid > throw new BadRequestError
- Hash pw (using bcryptjs)
- Save user
- Generate token
- Send res with token
 */

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // ERROR HANDLING IN CONTROLLER IS REDUNDANT IN THIS CASE >> MONGOOSE VALIDATOR WILL DO IT
  // >> EDIT 500/error to represent actual 400-error / Bad Request
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email and password.");
  // }

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

/* 
#### Login User

- Validate (email, pw) in controller
- if invalid inputs > throw new BadRequestError
- Find user
- compare pw
- if no match > throw new UnauthorizedError
- if correct, generate token
- send res with token
 */

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
