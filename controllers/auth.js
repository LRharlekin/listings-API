const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  /* 
  // IF HASHING WASN'T DONE IN PRE-HOOK MIDDLEWARE IN THE MODEL
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = {
    name,
    email,
    password: hashedPassword,
  };
  const user = await User.create({ ...tempUser });
 */

  // ERROR HANDLING IN CONTROLLER IS REDUNDANT IN THIS CASE >> MONGOOSE VALIDATOR WILL DO IT
  // >> EDIT 500/error to represent actual 400-error / Bad Request
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email and password.");
  // }

  // See User model: This will pass through mongoose pre-save middleware, where hashing is done.
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  // const token = jwt.sign(
  //   { userID: user._id, name: user.name },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: "30d",
  //   }
  // );

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
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
