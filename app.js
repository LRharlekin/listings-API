require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();

const connectDB = require("./db/connect");

// require routers
const authRouter = require("./routes/auth");
const listingsRouter = require("./routes/listings");

// require middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// pre-hook middlewares
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listings", listingsRouter);

// post-hook middlewares
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
