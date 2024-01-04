require("dotenv").config();
require("express-async-errors");

/* security packages */
const helmet = require('helmet');
const cors require('cors');
const { xss } = require('express-xss-sanitizer');
const rateLimiter = require("./middlewares/rate-limiter");

const express = require("express");

const app = express();
 
const connectDB = require("./db/connect");
const authenticateUser = require("./middlewares/authentication");

/* require routers */
const authRouter = require("./routes/auth");
const listingsRouter = require("./routes/listings");

// require middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

/* pre-hook middlewares */
app.enable("trust proxy");
app.disable("x-powered-by");
app.use(rateLimiter()); // register rate-limiter as the very FIRST middleware!!
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

/* routes */
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listings", authenticateUser, listingsRouter);

/* post-hook middlewares */
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB!");
    app.listen(port, () => {
      console.log(`Listening on PORT:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
